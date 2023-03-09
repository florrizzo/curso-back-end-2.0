const DAO = require("../persistencia/datos");
const ProductosDao = DAO[0];
const CarritosDao = DAO[1];
const contenedor = ProductosDao.getInstance();
const contenedorCarrito = CarritosDao.getInstance();
const logger = require("../config/logger");

async function buscarProducto(product) {
  if (!contenedor.getByName(product)) {
    return false;
  } else {
    let resultado = await contenedor.getByName(product);
    return resultado;
  }
}

module.exports = {
  buscarProducto,
};
