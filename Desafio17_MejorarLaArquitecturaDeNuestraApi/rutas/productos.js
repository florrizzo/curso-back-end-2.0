const Router = require("express");
const routerProductos = new Router();
const routes = require("../controlador/productos");
const passport = require("passport");

routerProductos.post("/buscadorproductos", routes.postProductFilter);
routerProductos.get("/buscadorproductos", (req, res) => {
  res.redirect("/");
});

module.exports = routerProductos;
