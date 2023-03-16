const Router = require("express");
const routerProducts = new Router();
const controller = require("../controller/products");

routerProducts.get("/", controller.getProducts);

routerProducts.get("/name/:name", controller.getProductByName);

routerProducts.get("/id/:id", controller.getProductById);

routerProducts.post("/", controller.postProduct);

routerProducts.put("/:id", controller.putProductById);

routerProducts.delete("/:id", controller.deleteProductById);

module.exports = routerProducts;
