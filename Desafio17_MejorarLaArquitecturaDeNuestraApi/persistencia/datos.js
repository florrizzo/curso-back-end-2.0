const logger = require("../config/logger");
const DaoMongoDB = require("./daos/DaoMongoDB");
const ProductosDaoMongoDB = DaoMongoDB[0]
const CarritosDaoMongoDB = DaoMongoDB[1];
const DaoMemoria = require("./daos/DaoMemoria");
const ProductosDaoMemoria = DaoMemoria[0];
const CarritosDaoMemoria = DaoMemoria[1];

function validacionId(array, id) {
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

let DAOProductos;
let DAOCarritos;
let modo = process.argv[2];

if (modo == "prod"){
  DAOProductos = ProductosDaoMongoDB;
  DAOCarritos = CarritosDaoMongoDB;
} else if (modo == "dev"){
  DAOProductos = ProductosDaoMemoria;
  DAOCarritos = CarritosDaoMemoria;
} else {
  throw 'Indicar que modo utilizar para fabricar DAO'
}

module.exports = [ DAOProductos, DAOCarritos ];