const express = require('express');
const { Router } = express;
const Contenedor = require('./classContainer');
const fs = require('fs');
const app = express();
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

app.use('/api/productos', routerProductos);

app.get('/', (req, res) => {
  res.json('Entraste a la página de Date el gusto!');
});

// GET '/api/productos' -> devuelve todos los productos.
routerProductos.get('/', (req, res) => {
  res.json(contenedor.getAll());
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get('/:id', (req, res) => {
  let { id } = req.params;
  if (!id.match(/^\d+/)) {
    res.json('error: "El parámetro no es un número"');
  } else if (parseInt(id) > productos.length || parseInt(id) == 0) {
    res.json('error: "No existe ningún producto con ese número de id"');
  } else {
    id = parseInt(id);
    res.json(contenedor.getById(id));
  }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post('/', async (req, res) => {
  try{
    const {body} = req;
    // const id = await contenedor.save(body.title, body.price, body.thumbnail);
    console.log(body);
    refreshProductos();
    // res.json(contenedor.getById(id));
  }catch{
    res.json('error');
  }
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put('/:id', async (req, res) => {
  try{
    let { id } = req.params;
    const { body } = req;
    id = parseInt(id);
    console.log(id);
    console.log(body);
    await contenedor.replace(id, body.title, body.price, body.thumbnail);
    refreshProductos();
    res.json('El cambio se realizó con exito'); 
  } catch {
    res.json('error');
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProductos.delete('/:id', (req, res) => {
  let { id } = req.params;
  if (!id.match(/^\d+/)) {
    res.json('error: "El parámetro no es un número"');
  } else if (parseInt(id) > productos.length || parseInt(id) == 0) {
    res.json('error: "No existe ningún producto con ese número de id"');
  } else {
    id = parseInt(id);
    contenedor.deleteById(id);
    refreshProductos();
    res.json('El producto se eliminó con éxito');
  }
});

// Crear un espacio público de servidor que contenga un documento index.html con un 
// formulario de ingreso de productos con los datos apropiados.
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/form", (req, res) => {
  const { body } = req;
  console.log(body);
  contenedor.save(body.title, body.price, body.thumbnail);
  res.send("El producto se subió correctamente");
});

routerProductos.get('/random', (req, res) => {
  const number = productos.length;
  const random = Math.floor(Math.random() * number);
  res.json(productos[random]);
});

