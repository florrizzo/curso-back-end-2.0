import { Schema, model } from 'mongoose';

const ProductosSchema = new Schema({
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  codigo: { type: String, required: true, max: 100 },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const Productos = model('productos', ProductosSchema);