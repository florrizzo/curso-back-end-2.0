const express = require('express');
const app = express();
const { Router } = express;
const Contenedor = require('./classContainer');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const moment = require('moment');

//IMPLEMENTACION
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () =>
  console.log('SERVER ON http://localhost:' + PORT)
);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const contenedor = new Contenedor();
let productos;

const refreshProductos = () => (productos = contenedor.getAll());
refreshProductos();

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

let messages = JSON.parse(fs.readFileSync("./historialMensajes.txt"));
const fechaHora = moment().format('DD / MM / YYYY, h:mm:ss'); 
io.on('connection', (socket) => {
  console.log('Usuario conectado');
  messages.push({ email: '', fecha: fechaHora, mensaje: 'Se conecto un nuevo usuario' });
  io.sockets.emit('msg-list', messages);
  io.sockets.emit('product-list', productos);

  socket.on('msg', (data) => {
    messages.push({ email: data.email, fecha: fechaHora, mensaje: data.mensaje });
    io.sockets.emit('msg-list', messages);
    fs.writeFileSync("./historialMensajes.txt", JSON.stringify(messages));
  });

  socket.on('product', async (data) => {
    await contenedor.save(data.title, data.price, data.thumbnail);
    refreshProductos();
    io.sockets.emit('product-list', productos);
  });
});
