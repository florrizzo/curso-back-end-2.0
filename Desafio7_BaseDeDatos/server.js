const express = require('express');
const app = express();
const { Router } = express;
const Contenedor = require('./classContainer');
const Mensajes = require('./classMensajes');
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
const messages = new Mensajes();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', async (socket) => {
  const fechaHora = moment().format('DD / MM / YYYY, h:mm:ss');
  console.log('Usuario conectado');
  await messages.save('usuario nuevo', fechaHora, 'Se conecto un nuevo usuario');
  io.sockets.emit('msg-list', await messages.getAll());
  io.sockets.emit('product-list', await contenedor.getAll());

  socket.on('msg', async (data) => {
    console.log(data.email, fechaHora, data.mensaje);
    await messages.save(data.email, fechaHora, data.mensaje);
    io.sockets.emit('msg-list', await messages.getAll());
  });

  socket.on('product', async (data) => {
    await contenedor.save(data.title, data.price, data.thumbnail);
    io.sockets.emit('product-list', await contenedor.getAll());
  });
});
