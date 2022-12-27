import mongoose from "mongoose";
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
  constructor() {
    this.model = mongoose.model('productos', ModeloProductos.ProductosSchema);
  }

  async getAll() {
    const resultado = await this.model.find({});
    return resultado;
  }

  async getById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num);
    if (validacion){
      let resultado = await this.model.find({ _id: num });
      resultado = resultado[0];
      return resultado
    } else {
      return "No existe el número de id elegido";
    }
  }

  async save(nombre, precio, foto) {
    try{
      const productoNuevo = new ModeloProductos({
        nombre: nombre,
        precio: precio,
        foto: foto
      });
      await productoNuevo.save();
      const aux = await ModeloProductos.find({ nombre: nombre});
      const id = aux[0]._id;
      return id
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error"
    }
  }

  async replace(
    num,
    nombre,
    precio,
    foto
  ) {
    const lista = await ModeloProductos.find({});
    const validacion = validacionId(lista, num); 
    if (validacion){
      await ModeloProductos.updateOne(
        { _id: num },
        {
          $set: {
            timestamp: timestamp,
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
          },
        }
      );
      const aux = await ModeloProductos.find({ _id: num});
      return `Se actualizó el producto ${aux[0].nombre}`
    } else {
      return "No existe el número de id elegido";
    }
  }

  async deleteById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num); 
    if (validacion){
    await this.model.deleteOne({ _id: num });
    return `Se eliminó con exito`;
    } else {
      return "No existe el número de id elegido";
    }
  }
}

export {ContenedorMongoDB};
