import { connect } from 'mongoose';
import { Usuarios } from './models/usuario.js';


async function connectMG() {
    try {
      await connect('mongodb+srv://florrizzo:qazzaq14@cluster0.m7cm2ni.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
    } catch (e) {
      console.log(e);
      throw 'can not connect to the db'
    }
}

const db = await connectMG();

//GUARDANDO UN USUARIO NUEVO
// console.log('GUARDANDO UN USUARIO NUEVO');
// const usuarioNuevo = new Usuarios({
//   name: 'julian',
//   usuario: 'julian',
//   email: 'julian@gmail.com',
//   password: 123123123,
// });
// const usuarioGuardado = await usuarioNuevo.save();
// console.log(usuarioGuardado);

//UPDATE A UN USUARIO EXISTENTE
// console.log('UPDATE A UN USUARIO EXISTENTE');
// const usuarioModificado = await Usuarios.updateOne(
//   { name: 'ana' },
//   {
//     $set: {
//       email: 'modificado@gmail.com',
//     },
//   }
// );
// console.log(usuarioModificado);

// //LEER TODOS LOS USUARIOS
console.log('LEER TODOS LOS USUARIOS');
const usuarios = await Usuarios.find({});
console.log(usuarios);

// //LEER ALGUNOS USUARIOS
// console.log('LEER USUARIOS');
// const algunosUsuarios = await Usuarios.find({}).sort({ name: 1 }).limit(2).skip(25);
// console.log(algunosUsuarios);

// //BORRAR UN USUARIO EXISTENTE
// console.log('BORRAR UN USUARIO EXISTENTE');
// const usuarioBorrar = await Usuarios.deleteOne({ name: 'guille' });
// console.log(usuarioBorrar);
