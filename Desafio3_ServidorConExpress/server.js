const express = require('express');
const Contenedor = require('./classContainer');
const fs = require('fs');
const { clearScreenDown } = require('readline');
const app = express();

const port = process.env.PORT || 8080;
const contenedor = new Contenedor();
const productos = contenedor.getAll();

app.get('/', (req, res) => {
  res.json('Hola mundo!');
});

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.get('/productosRandom', (req, res) => {
    const number = productos.length;
    const random = Math.floor(Math.random() * number)
    res.json(productos[random]);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
