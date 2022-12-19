import express from "express";
const { Router } = express;
const routerCarrito = Router();
import instancia from '../src/daos/index.js';
import moment from "moment";

const carrito = new instancia.carrito;
const producto = new instancia.producto;

routerCarrito.get("/", async (req, res) => {
    const lista = carrito.getAll();
    res.json(lista);
  });
  
  routerCarrito.get("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    res.json(carrito.getById(id));
  });
  
  routerCarrito.post("/", async (req, res) => {
    try {
      const timestampCarrito = moment().format("DD / MM / YYYY, h:mm:ss");
      const idCarrito = await carrito.addCart(timestampCarrito);
      res.json(`Se creó un carrito nuevo con el id: ${idCarrito}`);
    } catch {
      res.json("error");
    }
  });
  
  routerCarrito.get("/:id/productos", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const resultado = carrito.getProductsFromCart(id);
    res.json(resultado);
  });
  
  routerCarrito.post("/:id/productos/:id_prod", (req, res) => {
    try {
      let { id_prod } = req.params;
      id_prod = parseInt(id_prod);
      let { id } = req.params;
      id = parseInt(id);
      let productoParaCarrito = producto.getById(id_prod);
      if (carrito.getById(id) == "No existe el número de id elegido") {
        res.json('error: "No existe ningún carrito con ese número de id"');
      } else if (productoParaCarrito == "No existe el número de id elegido") {
        res.json('error: "No existe ningún producto con ese número de id"');
      } else {
        carrito.addProductToCart(id, productoParaCarrito);
        res.json(
          `Se añadio el producto ${productoParaCarrito.nombre} al carrito`
        );
      }
    } catch {
      res.json("error");
    }
  });
  
  routerCarrito.delete("/:id", async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const resultado = await carrito.deleteById(id);
    res.json(resultado);
  });
  
  routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
    try {
      let { id_prod } = req.params;
      id_prod = parseInt(id_prod);
      let { id } = req.params;
      id = parseInt(id);
      let productoCarrito = producto.getById(id_prod);
      if (carrito.getById(id) == "No existe el número de id elegido") {
        res.json('error: "No existe ningún carrito con ese número de id"');
      } else if (productoCarrito == "No existe el número de id elegido") {
        res.json('error: "No existe ningún producto con ese número de id"');
      } else {
        carrito.deleteProductFromCart(id, id_prod);
        res.json(`Se eliminó el producto del carrito`);
      }
    } catch {
      res.json("error");
    }
  }); 

export default routerCarrito;