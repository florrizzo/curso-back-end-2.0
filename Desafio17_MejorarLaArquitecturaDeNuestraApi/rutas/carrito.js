const Router = require("express");
const routerCarrito = new Router();
const routes = require("../controlador/carrito");

routerCarrito.post("/enviarCarrito", routes.postEnviarCarrito);

routerCarrito.post("/addToCart", routes.postAddToCart);

routerCarrito.post("/deleteFromCart", routes.deleteFromCart);

routerCarrito.post("/emptyCart", routes.postEmptyCart);

module.exports = routerCarrito;
