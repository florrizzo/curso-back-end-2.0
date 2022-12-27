import express from 'express';
import moment from 'moment';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as Socket } from "socket.io";
import generateFakeProducts from './utils/fakerProductGenerator.js';
import mongoose from 'mongoose';
import { ModeloProductos } from "./models/productos.js";

const app = express();
const PORT = 8080;
const timestamp = moment().format('h:mm a');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(PORT, () =>
  console.log('SERVER ON http://localhost:' + PORT)
);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));



/* Mongo conection */

async function connectMG() {
  try {
    await mongoose.connect('mongodb+srv://coder:zI3QtpPlq3n6umJ6@dateelgusto.fwvjhhb.mongodb.net/test', { useNewUrlParser: true });
    console.log('Conectado a mongo! ✅');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

await connectMG();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// io.on('connection', async (socket) => {
//   const fechaHora = moment().format('DD / MM / YYYY, h:mm:ss');
//   console.log('Usuario conectado');
//   await messages.save('usuario nuevo', fechaHora, 'Se conecto un nuevo usuario');
//   io.sockets.emit('msg-list', await messages.getAll());
//   io.sockets.emit('product-list', await contenedor.getAll());

//   socket.on('msg', async (data) => {
//     console.log(data.email, fechaHora, data.mensaje);
//     await messages.save(data.email, fechaHora, data.mensaje);
//     io.sockets.emit('msg-list', await messages.getAll());
//   });

//   socket.on('product', async (data) => {
//     await contenedor.save(data.title, data.price, data.thumbnail);
//     io.sockets.emit('product-list', await contenedor.getAll());
//   });
// });