const express = require("express");
const { Router } = express;
const routerProductos = Router();
const ProductosDaoArchivo = require("../src/daos/productos/ProductosDaoArchivo");
const contenedorProducto = new ProductosDaoArchivo();
const moment = require("moment");

routerProductos.get("/", async (req, res) => {
  const lista = contenedorProducto.getAll();
  res.json(lista);
});

routerProductos.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  res.json(contenedorProducto.getById(id));
});

routerProductos.post("/", async (req, res) => {
  const { body } = req;
  const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
  const id = await contenedorProducto.save(
    timestamp,
    body.nombre,
    body.descripcion,
    body.codigo,
    body.foto,
    body.precio,
    body.stock
  );
  res.json(contenedorProducto.getById(id));
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
        let respuesta = await contenedorProducto.deleteById(id)
        res.json(respuesta);
    }
  );  

module.exports = routerProductos;
