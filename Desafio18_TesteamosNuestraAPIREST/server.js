/* Imports */
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const HttpServer = require("http").Server;
const session = require("express-session");
const cors = require("cors");
const logger = require("./config/logger");

/* Express server */
const app = express();

if (process.env.MODE != "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;
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

httpServer.listen(PORT, () => {
  console.log({
    PORT,
    MONGO_URL,
  });
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const routerProducts = require("./routes/products");
app.use("/api/products", routerProducts);
