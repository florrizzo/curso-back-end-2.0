import { connect } from 'mongoose';
import { Productos } from '../../models/productos';
const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");


async function connectMG() {
    try {
      await connect('mongodb+srv://CoderBackEnd:QSaze8bBnE7PX8Tz@cluster0.onhgo54.mongodb.net/test', { useNewUrlParser: true });
    } catch (e) {
      console.log(e);
      throw 'can not connect to the db'
    }
}

const db = await connectMG();


class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super(db)
    }
}

module.exports = ProductosDaoMemoria;

