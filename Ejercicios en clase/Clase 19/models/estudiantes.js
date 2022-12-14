import { Schema, model } from 'mongoose';

const EstudiantesSchema = new Schema({
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true, max: 100 },
  dni: { type: String, unique: true, required: true },
  curso: { type: String, required: true, max: 100 },
  nota: { type: Number, required: true, max: 100 },
  ingreso: { type: Boolean, require: false }
});

export const Estudiantes = model('estudiantes', EstudiantesSchema);