const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { ProductsModel } = require("../models/products");
const logger = require("../../config/logger");

let instance = null;
class Singleton {
  constructor() {
    (async () => {
      try {
        await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
        });
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

class ContenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const result = await this.model.find({});
    return result;
  }

  async getById(id) {
    try {
      const result = await this.model.find(
        { _id: id },
        { __v: false }
      );
      return result;
    } 
    catch {
      return false;
    }
    
  }

  async getByName(name) {
    const result = await this.model.find(
      { title: { $regex: name, $options: "i" } },
      { __v: false }
    );
    return result;
  }

  async save(title, thumbnail, price) {
    try {
      const productoNuevo = new ProductsModel({
        title: title,
        thumbnail: thumbnail,
        price: price,
      });
      let result = await productoNuevo.save();
      return result
    } catch {
      logger.log("error", "Se ha producido un error al guardar el producto");
      return "Se ha producido un error";
    }
  }

  async replace(id, title, thumbnail, price) {
    await ProductsModel.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            thumbnail: thumbnail,
            price: price
          },
        }
      );
      let result = await this.getById(id)
      return result[0]
  }

  async deleteById(id) {
    await this.model.deleteOne({ _id: id });
    return `Se eliminó con exito`;
  }
}

let instanceProduct = null;
class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: "products",
      schema: ProductsModel.ProductsSchema,
    });
  }

  static getInstance() {
    if (!instanceProduct) {
      instanceProduct = new ProductosDaoMongoDB();
    }
    return instanceProduct;
  }
}


module.exports = [ProductosDaoMongoDB];
