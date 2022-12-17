import { connect } from 'mongoose';

class ContenedorMongoDB {
  constructor(db) {
    this.db = db;
  }

  getAll() {
  }

  getById(num) {
  }

  async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
  }

  async replace(
    num,
    timestamp,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock
  ) {
  }

  async deleteById(num) {
  }

  async addCart(timestampCarrito) {
  }

  getProductsFromCart(id) {
  }

  addProductToCart(num, producto) {
  }

  deleteProductFromCart(num, id_prod) {
  }
}

module.exports = ContenedorMongoDB;
