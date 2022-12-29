import express from 'express';
const app = express();
// import Contenedor from './classContainer.js';
import { ProductosDaoMongoDB } from './daos/ProductosDaoMongoDB.js';
import fs from 'fs';
const PORT = process.env.PORT || 8080;
import moment from 'moment';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

//IMPLEMENTACION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

/* Mongo conection */

async function connectMG() {
  try {
    await mongoose.connect('mongodb+srv://coder:zI3QtpPlq3n6umJ6@dateelgusto.fwvjhhb.mongodb.net/dateelgusto', { useNewUrlParser: true });
    console.log('Conectado a mongo! ✅');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

await connectMG();


const contenedor = new ProductosDaoMongoDB();

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

let messages = JSON.parse(fs.readFileSync("./historialMensajes.txt"));
const fechaHora = moment().format('DD / MM / YYYY, h:mm:ss'); 
io.on('connection', async (socket) => {
  console.log('Usuario conectado');
  messages.push({ email: '', fecha: fechaHora, mensaje: 'Se conecto un nuevo usuario' });
  io.sockets.emit('msg-list', messages);
  io.sockets.emit('product-list', await contenedor.getAll());

  socket.on('msg', (data) => {
    messages.push({ email: data.email, fecha: fechaHora, mensaje: data.mensaje });
    io.sockets.emit('msg-list', messages);
    fs.writeFileSync("./historialMensajes.txt", JSON.stringify(messages));
  });

  socket.on('product', async (data) => {
    await contenedor.save(data.title, data.price, data.thumbnail);
    io.sockets.emit('product-list', await contenedor.getAll());
  });
});
