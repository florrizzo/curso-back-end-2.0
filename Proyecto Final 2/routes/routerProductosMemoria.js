const express = require("express");
const { Router } = express;
const routerProductos = Router();
const ProductosDaoMemoria = require("../src/daos/productos/ProductosDaoMemoria");
const contenedorProducto = new ProductosDaoMemoria();
const moment = require("moment");

routerProductos.get("/", async (req, res) => {
    res.json(contenedorProducto.getAll('productos'));
});

routerProductos.get("/:id", (req, res) => {
    let {id} = req.params;
    id = JSON.parse(id);
    res.json(contenedorProducto.getById(id, 'productos'));
});

routerProductos.post("/", (req, res) => {
    const { body } = req;
    const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
    const id = contenedorProducto.save(
      timestamp,
      body.nombre,
      body.descripcion,
      body.codigo,
      body.foto,
      body.precio,
      body.stock
    );
    res.json("Se añadió el producto con exito");
  });
  
routerProductos.put("/:id", async (req, res) => {
  try {
  let { id } = req.params;
  const { body } = req;
  id = parseInt(id);
  const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
  const resultado = await contenedorProducto.replace(
    id,
    timestamp,
    body.nombre,
    body.descripcion,
    body.codigo,
    body.foto,
    body.precio,
    body.stock
  );
  res.json(resultado);
} catch {
  res.json("error");
}
});

routerProductos.delete(
    '/:id',
    async (req, res) => {
      let { id } = req.params;
      id = parseInt(id);
      let respuesta = await contenedorProducto.deleteById(id, 'productos')
      res.json(respuesta);
  }
  );  

module.exports = routerProductos;
