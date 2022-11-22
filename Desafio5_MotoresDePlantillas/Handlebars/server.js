const express = require('express');
const app = express();
const { Router } = express;
const Contenedor = require('./classContainer');
const fs = require('fs');
const routerProductos = Router();

const port = process.env.PORT || 8080;
const { engine } = require('express-handlebars');

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

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
  })
)

// GET '/api/productos' -> devuelve todos los productos.
routerProductos.get('/', (req, res) => {
  res.render('productslists', {productos, productoExiste: productos.length > 0});
});

app.get("/form", (req, res) => {
  res.render('form', {});
});

app.post("/productos", (req, res) => {
  const { body } = req;
  contenedor.save(body.title, body.price, body.thumbnail);
  refreshProductos();
  res.render('productslists', {productos, productoExiste: productos.length > 0});
});