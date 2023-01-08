import express from 'express';
const app = express();
import { ProductosDaoMongoDB } from './daos/ProductosDaoMongoDB.js';
import { MensajesDaoMongoDB } from './daos/MensajesDaoMongoDB.js';
const PORT = process.env.PORT || 8080;
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { normalize, schema, denormalize } from 'normalizr';
import session from 'express-session';
import MongoStore from "connect-mongo";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      'mongodb+srv://coder:zI3QtpPlq3n6umJ6@dateelgusto.fwvjhhb.mongodb.net/dateelgusto',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }));

//IMPLEMENTACION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

httpServer.listen(PORT, () =>
  console.log('SERVER ON http://localhost:' + PORT)
);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/* Mongo conection */

async function connectMG() {
  try {
    await mongoose.connect(
      'mongodb+srv://coder:zI3QtpPlq3n6umJ6@dateelgusto.fwvjhhb.mongodb.net/dateelgusto',
      { useNewUrlParser: true }
    );
    console.log('Conectado a mongo! ✅');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

await connectMG();

const contenedor = new ProductosDaoMongoDB();
const messages = new MensajesDaoMongoDB();

app.get('/', (req, res) => {
  if (req.session.user){
    res.render('productslists', {usuario: req.session.user});
  } else {
    res.redirect('/login')
  }
});

app.post('/', (req, res) => {
  const {body} = req;
  req.session.user = body.Usuario;
  res.render('productslists', {usuario: body.Usuario});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get("/showsession", (req, res) => {
  res.json(req.session);
});

app.get('/logout', (req, res) => {
  let usuario = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("No se pudo deslogear")
    } else {
      res.render('logout', {usuario: usuario});
    }
  }) 
});

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
      _id: JSON.stringify(message._id)
    }
    ListMessages.push(mensajeNuevo)
  }
 
  const authorSchema = new schema.Entity('authors', { idAttribute: 'id' });
  const messageSchema = new schema.Entity('message', {
    author: authorSchema,
  }, { idAttribute: "_id" })


  const normalizedListMessages = normalize(ListMessages, [messageSchema]);
  const cantOriginal = JSON.stringify(ListMessages).length;
  const cantNormalizada = JSON.stringify(normalizedListMessages).length;
  const respuesta = [normalizedListMessages, cantOriginal, cantNormalizada]
  return respuesta
}
normalizarMensajes()

io.on('connection', async (socket) => {
  console.log('Usuario conectado');
  io.sockets.emit('msg-list', await normalizarMensajes());
  io.sockets.emit('product-list', await contenedor.getAll());

  socket.on('msg', async (data) => {
    await messages.saveMsg(
      data.id,
      data.nombre,
      data.apellido,
      data.edad,
      data.alias,
      data.avatar,
      data.text
    );
    io.sockets.emit('msg-list', await normalizarMensajes());
  });

  socket.on('product', async (data) => {
    await contenedor.save(data.title, data.price, data.thumbnail);
    io.sockets.emit('product-list', await contenedor.getAll());
  });
});
