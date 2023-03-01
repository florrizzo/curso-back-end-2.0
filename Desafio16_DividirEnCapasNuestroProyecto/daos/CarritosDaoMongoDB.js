const ContenedorMongoDB = require("../persistencia/datos");
const ModeloCarritos = require("../models/carritos");

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'carritos',
      schema: ModeloCarritos.CarritosSchema,
    });
  }
}

module.exports = CarritosDaoMongoDB;