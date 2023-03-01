/* Imports */
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const ProductosDaoMongoDB = require("./daos/ProductosDaoMongoDB");
const MensajesDaoMongoDB = require("./daos/MensajesDaoMongoDB");
const HttpServer = require("http").Server;
const Socket = require("socket.io").Server;
const { normalize, schema, denormalize } = require("normalizr");
const session = require("express-session");
const LocalStrategy = require("./config/passport");
const passport = require("passport");
const logger = require("./config/logger");

/* Express server */
const app = express();

if (process.env.MODE != "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;
const MODE = process.env.MODE;
const MONGO_URL = process.env.MONGO_URL;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () => {
  console.log({
    PORT,
    MODE,
    MONGO_URL,
  });
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

/* Mongo conection */
async function connectMG() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    logger.log("info", "Conectado a mongo! ✅");
  } catch (e) {
    logger.log("error", e);
    throw "can not connect to the db";
  }
}

connectMG();

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

const routerDatos = require("./rutas/datos");
app.use("/", routerDatos);

const contenedor = new ProductosDaoMongoDB();
const messages = new MensajesDaoMongoDB();

/* Normalizr */
async function normalizarMensajes() {
  const Messages = await messages.getAll();
  const ListMessages = [];
  for (const message of Messages) {
    const mensajeNuevo = {
      author: {
        id: message.author.id,
        nombre: message.author.nombre,
        apellido: message.author.apellido,
        edad: message.author.edad,
        alias: message.author.alias,
        avatar: message.author.avatar,
      },
      text: message.text,
      _id: JSON.stringify(message._id),
    };
    ListMessages.push(mensajeNuevo);
  }

  const authorSchema = new schema.Entity("authors", { idAttribute: "id" });
  const messageSchema = new schema.Entity(
    "message",
    {
      author: authorSchema,
    },
    { idAttribute: "_id" }
  );

  const normalizedListMessages = normalize(ListMessages, [messageSchema]);
  const cantOriginal = JSON.stringify(ListMessages).length;
  const cantNormalizada = JSON.stringify(normalizedListMessages).length;
  const respuesta = [normalizedListMessages, cantOriginal, cantNormalizada];
  return respuesta;
}
normalizarMensajes();

/* Sockets */
/* io.on("connection", async (socket) => {
  console.log("Usuario conectado");
  io.sockets.emit("msg-list", await normalizarMensajes());
  io.sockets.emit("product-list", await contenedor.getAll());

  socket.on("msg", async (data) => {
    await messages.saveMsg(
      data.id,
      data.nombre,
      data.apellido,
      data.edad,
      data.alias,
      data.avatar,
      data.text
    );
    io.sockets.emit("msg-list", await normalizarMensajes());
  }); 
});*/
