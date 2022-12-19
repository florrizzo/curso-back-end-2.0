import express from "express";
const { Router } = express;
const routerProductos = Router();
import instancia from '../src/daos/index.js';
import moment from "moment";

const producto = new instancia.producto;

routerProductos.get("/", async (req, res) => {
    const lista = producto.getAll();
    res.json(lista);
  });
  
  routerProductos.get("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    res.json(producto.getById(id));
  });
  
  routerProductos.post("/", async (req, res) => {
    const { body } = req;
    const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
    const id = await producto.save(
      timestamp,
      body.nombre,
      body.descripcion,
      body.codigo,
      body.foto,
      body.precio,
      body.stock
    );
    res.json(producto.getById(id));
  });
  
  routerProductos.put("/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const { body } = req;
      id = parseInt(id);
      const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
      const resultado = await producto.replace(
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
          let respuesta = await producto.deleteById(id)
          res.json(respuesta);
      }
    );  

    export default routerProductos;