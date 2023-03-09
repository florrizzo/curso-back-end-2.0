const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const ModeloProductos = require("../models/productos");
const ModeloCarritos = require("../models/carritos");
const ModeloMensajes = require("../models/mensajes.js");
const logger = require("../../config/logger");

let instance = null;
class Singleton {
  constructor() {
    (async () => {
      try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        logger.log("info", "Conectado a mongo! ✅");
      } catch (e) {
        logger.log("error", e);
        throw "can not connect to the db";
      }
    })();
  }
  static getInstance() {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  }
}

Singleton.getInstance();
Singleton.getInstance();
Singleton.getInstance();
Singleton.getInstance();

class ContenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const resultado = await this.model.find({});
    return resultado;
  }

  async getByName(name) {
    const resultado = await this.model.find(
      { title: {'$regex': name, $options:'i'}}, 
      { _id: false, __v: false }
    );
    return resultado;
  }

  async save(title, price, thumbnail) {
    try {
      const productoNuevo = new ModeloProductos({
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
      await productoNuevo.save();
    } catch {
      logger.log("error", "Se ha producido un error al guardar el producto");
      return "Se ha producido un error";
    }
  }

  async getCartProducts(username) {
    const carritoUsuario = await this.model.find(
      { username: username },
      { _id: false, __v: false }
    );
    if (carritoUsuario.length > 0) {
      return carritoUsuario[0].productos;
    } else {
      return false;
    }
  }

  async addToCart(username, product) {
    const carritoUsuario = await this.model.find(
      { username: username },
      { _id: false, __v: false }
    );
    if (carritoUsuario.length > 0) {
      const productosCarrito = carritoUsuario[0].productos;
      productosCarrito.push(product);
      await this.model.updateOne(
        { username: username },
        {
          $set: {
            productos: productosCarrito,
          },
        }
      );
    } else {
      try {
        const carritoNuevo = new ModeloCarritos({
          username: username,
          productos: product,
        });
        await carritoNuevo.save();
      } catch {
        logger.log("error", "Se ha producido un error");
        return "Se ha producido un error";
      }
    }
  }

  async deleteFromCart(username, product) {
    const carritoUsuario = await this.model.find(
      { username: username },
      { _id: false, __v: false }
    );
    const productosCarrito = carritoUsuario[0].productos;
    const indexProduct = productosCarrito.findIndex(
      (object) => object.title == product.title
    );
    productosCarrito.splice(indexProduct, 1);
    await this.model.updateOne(
      { username: username },
      {
        $set: {
          productos: productosCarrito,
        },
      }
    );
  }

  async emptyCart(username) {
    await this.model.deleteOne({ username: username });
  }

  async saveMsg(id, nombre, apellido, edad, alias, avatar, text) {
    try {
      const mensajeNuevo = new ModeloMensajes({
        author: {
          id: id,
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          alias: alias,
          avatar: avatar,
        },
        text: text,
      });
      await mensajeNuevo.save();
    } catch {
      logger.log("error", "Se ha producido un error al guardar el mensaje");
      return "Se ha producido un error";
    }
  }
}

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'productos',
      schema: ModeloProductos.ProductosSchema,
    });
  }
}

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'carritos',
      schema: ModeloCarritos.CarritosSchema,
    });
  }
}

class MensajesDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'mensajes',
      schema: ModeloMensajes.MensajesSchema,
    });
  }
}

module.exports = [ProductosDaoMongoDB, CarritosDaoMongoDB];