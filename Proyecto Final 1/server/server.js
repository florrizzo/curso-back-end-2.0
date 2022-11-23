const express = require('express');
const { Router } = express;
const Contenedor = require('./classContainer');
const fs = require('fs');
const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const moment = require('moment');
const Carrito = require('./classCarrito');
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);


const port = process.env.PORT || 8080;
const contenedorProducto = new Contenedor();
const contenedorCarrito = new Carrito();
let productos;
let carrito;
let isAdmin = true;

const refreshProductos = () => (productos = contenedorProducto.getAll());
refreshProductos();
const refreshCarrito = () => (carrito = contenedorCarrito.getAll());
refreshCarrito();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.get('/', (req, res) => {
  res.json('Entraste a la página de Date el gusto!');
});

app.get('/*', (req, res) => {
  res.json({ error: true, descripcion: 'ruta no encontrada' });
});

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id
// (disponible para usuarios y administradores (middleware))
routerProductos.get('/', (req, res) => {
  res.json(contenedorProducto.getAll());
});

routerProductos.get('/:id', (req, res) => {
  let { id } = req.params;
  const index = productos.findIndex((object) => object.idProducto == id);
  if (!id.match(/^\d+/)) {
    res.json('error: "El parámetro no es un número"');
  } else if (!productos[index]) {
    res.json('error: "No existe ningún producto con ese número de id"');
  } else {
    id = parseInt(id);
    res.json(contenedorProducto.getById(id));
  }
});

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
routerProductos.post(
  '/',
  (req, res, next) => {
    if (isAdmin == true) {
      next();
    } else {
      return res.status(401).json('error: Solo para usuarios administradores');
    }
  },
  async (req, res) => {
    try {
      const { body } = req;
      const timestamp = moment().format('DD / MM / YYYY, h:mm:ss');
      const id = await contenedorProducto.save(
        timestamp,
        body.nombre,
        body.descripcion,
        body.codigo,
        body.foto,
        body.precio,
        body.stock
      );
      refreshProductos();
      res.json(contenedorProducto.getById(id));
    } catch {
      res.json('error');
    }
  }
);

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductos.put(
  '/:id',
  (req, res, next) => {
    if (isAdmin == true) {
      next();
    } else {
      return res.status(401).json('error: Solo para usuarios administradores');
    }
  },
  async (req, res) => {
    try {
      let { id } = req.params;
      const index = productos.findIndex((object) => object.idProducto == id);
      if (!id.match(/^\d+/)) {
        res.json('error: "El parámetro no es un número"');
      } else if (!productos[index]) {
        res.json('error: "No existe ningún producto con ese número de id"');
      } else {
        const { body } = req;
        id = parseInt(id);
        const timestamp = moment().format('DD / MM / YYYY, h:mm:ss');
        await contenedorProducto.replace(
          id,
          timestamp,
          body.nombre,
          body.descripcion,
          body.codigo,
          body.foto,
          body.precio,
          body.stock
        );
        refreshProductos();
        res.json('El cambio se realizó con exito');
      }
    } catch {
      res.json('error');
    }
  }
);

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete(
  '/:id',
  (req, res, next) => {
    if (isAdmin == true) {
      next();
    } else {
      return res.status(401).json('error: Solo para usuarios administradores');
    }
  },
  (req, res) => {
    let { id } = req.params;
    const index = productos.findIndex((object) => object.idProducto == id);
    if (!id.match(/^\d+/)) {
      res.json('error: "El parámetro no es un número"');
    } else if (!productos[index]) {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      id = parseInt(id);
      contenedorProducto.deleteById(id);
      refreshProductos();
      res.json('El producto se eliminó con éxito');
    }
  }
);

routerProductos.get('/random', (req, res) => {
  const number = productos.length;
  const random = Math.floor(Math.random() * number);
  res.json(productos[random]);
});

// Carrito

routerCarrito.get('/', (req, res) => {
  res.json(contenedorCarrito.getAll());
});

// POST: '/' - Crea un carrito y devuelve su id.
routerCarrito.post('/', async (req, res) => {
  try {
    const timestampCarrito = moment().format('DD / MM / YYYY, h:mm:ss');
    const idCarrito = await contenedorCarrito.nuevoCarrito(timestampCarrito);
    refreshCarrito();
    res.json(idCarrito);
  } catch {
    res.json('error');
  }
});

// DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCarrito.delete('/:id', (req, res) => {
  let { id } = req.params;
  const index = carrito.findIndex((object) => object.idCarrito == id);
  if (!id.match(/^\d+/)) {
    res.json('error: "El parámetro no es un número"');
  } else if (!carrito[index]) {
    res.json('error: "No existe ningún carrito con ese número de id"');
  } else {
    id = parseInt(id);
    contenedorCarrito.deleteById(id);
    refreshCarrito();
    res.json('El carrito se eliminó con éxito');
  }
});

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos', (req, res) => {
  let { id } = req.params;
  const index = carrito.findIndex((object) => object.idCarrito == id);
  if (!id.match(/^\d+/)) {
    res.json('error: "El parámetro no es un número"');
  } else if (!carrito[index]) {
    res.json('error: "No existe ningún producto con ese número de id"');
  } else {
    id = parseInt(id);
    res.json(carrito[index].productos);
  }
});

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
routerCarrito.post('/:id/productos/:id_prod', (req, res) => {
  try {
    let { id_prod } = req.params;
    id_prod = parseInt(id_prod);
    let { id } = req.params;
    id = parseInt(id);
    let productoParaCarrito = contenedorProducto.getById(id_prod);
    contenedorCarrito.agregarProducto(id, productoParaCarrito);
    refreshCarrito();
    res.json(`Se añadio el producto ${producto.nombre} al carrito`);
  } catch {
    res.json('error');
  }
});

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
  let { id } = req.params;
  let { id_prod } = req.params;
  contenedorCarrito.deleteProduct(id, id_prod);
  refreshCarrito();
  res.json(`Se eliminó el producto del carrito`)
})