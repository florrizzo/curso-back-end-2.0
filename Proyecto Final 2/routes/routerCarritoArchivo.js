const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const CarritosDaoArchivo = require("../src/daos/carritos/CarritosDaoArchivos");
const contenedorCarritos = new CarritosDaoArchivo();
const ProductosDaoArchivo = require("../src/daos/productos/ProductosDaoArchivo");
const contenedorProducto = new ProductosDaoArchivo();
const moment = require("moment");

routerCarrito.get("/", async (req, res) => {
  const lista = contenedorCarritos.getAll();
  res.json(lista);
});

routerCarrito.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  res.json(contenedorCarritos.getById(id));
});

routerCarrito.post("/", async (req, res) => {
  try {
    const timestampCarrito = moment().format("DD / MM / YYYY, h:mm:ss");
    const idCarrito = await contenedorCarritos.addCart(timestampCarrito);
    res.json(`Se creó un carrito nuevo con el id: ${idCarrito}`);
  } catch {
    res.json("error");
  }
});

routerCarrito.get("/:id/productos", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const resultado = contenedorCarritos.getProductsFromCart(id);
  res.json(resultado);
});

routerCarrito.post("/:id/productos/:id_prod", (req, res) => {
  try {
    let { id_prod } = req.params;
    id_prod = parseInt(id_prod);
    let { id } = req.params;
    id = parseInt(id);
    let productoParaCarrito = contenedorProducto.getById(id_prod);
    if (contenedorCarritos.getById(id) == "No existe el número de id elegido") {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoParaCarrito == "No existe el número de id elegido") {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      contenedorCarritos.addProductToCart(id, productoParaCarrito);
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
  const resultado = await contenedorCarritos.deleteById(id);
  res.json(resultado);
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  try {
    let { id_prod } = req.params;
    id_prod = parseInt(id_prod);
    let { id } = req.params;
    id = parseInt(id);
    let productoCarrito = contenedorProducto.getById(id_prod);
    if (contenedorCarritos.getById(id) == "No existe el número de id elegido") {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoCarrito == "No existe el número de id elegido") {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      contenedorCarritos.deleteProductFromCart(id, id_prod);
      res.json(`Se eliminó el producto del carrito`);
    }
  } catch {
    res.json("error");
  }
});

module.exports = routerCarrito;
