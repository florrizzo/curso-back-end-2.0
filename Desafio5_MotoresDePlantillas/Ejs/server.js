const express = require('express');
const app = express();
const { Router } = express;
const Contenedor = require('./classContainer');
const fs = require('fs');
const routerProductos = Router();

const port = process.env.PORT || 8080;

const contenedor = new Contenedor();
let productos;

const refreshProductos = () => productos = contenedor.getAll();
refreshProductos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use('/productos', routerProductos);
app.use(express.static('public'))

app.set('view engine', 'ejs');

// GET '/aproductos' -> devuelve todos los productos.
routerProductos.get('/', (req, res) => {
  res.render('productslists', {productos});
});

app.get("/form", (req, res) => {
  res.render('form', {});
});

app.post("/productos", (req, res) => {
  const { body } = req;
  contenedor.save(body.title, body.price, body.thumbnail);
  refreshProductos();
  res.render('productslists', {productos});
});

