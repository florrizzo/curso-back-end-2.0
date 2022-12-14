import mongoose from "mongoose";
import { ModeloMensajes } from "../models/mensajes.js";
import { ModeloProductos } from "../models/productos.js";

function validacionId(array, id){
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const resultado = await this.model.find({});
    return resultado;
  }

  async save(title, price, thumbnail) {
    try{
      const productoNuevo =new ModeloProductos({
        title: title,
        price: price,
        thumbnail: thumbnail
      });
      await productoNuevo.save();
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error"
    }
  }

  async saveMsg(id, nombre, apellido, edad, alias, avatar, text ) {
    try{
      const mensajeNuevo = new ModeloMensajes({
        author:{
          id: id,
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          alias: alias,
          avatar: avatar
        },
        text: text
      });
      await mensajeNuevo.save();
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error"
    }
  }  
}

export {ContenedorMongoDB};
