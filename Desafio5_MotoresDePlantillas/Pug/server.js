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

app.set('view engine', 'pug');
app.set('views', './views');


// GET '/api/productos' -> devuelve todos los productos.
routerProductos.get('/', (req, res) => {
  res.render('productslists.pug', {productos, productoExiste: productos.length});
});

// Crear un espacio público de servidor que contenga un documento index.html con un 
// formulario de ingreso de productos con los datos apropiados.
app.get("/form", (req, res) => {
  res.render('form.pug', {});
});

app.post("/productos", (req, res) => {
  const { body } = req;
  contenedor.save(body.title, body.price, body.thumbnail);
  refreshProductos();
  res.render('productslists', {productos});
});

