import { connect } from 'mongoose';
import { Estudiantes } from './models/estudiantes.js';

async function connectMG() {
    try {
      await connect('mongodb://localhost:27017/colegio', { useNewUrlParser: true });
    } catch (e) {
      console.log(e);
      throw 'can not connect to the db'
    }
}

const db = await connectMG();

const estudiantes = [
{ nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
{ nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
{ nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
{ nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
{ nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
{ nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
{ nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
{ nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
{ nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
{ nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]

const guardarEstudiantes = async () => {
    for (const estudiante of estudiantes) {
        await new Estudiantes(estudiante).save()
    }
}

// guardarEstudiantes();

const read = async() => {
    const listaEstudiantes = await Estudiantes.find({});
    console.log(listaEstudiantes);
}

// read();

// Actualizar el dni del estudiante Lucas Blanco a 20355875

const update = async() => {
    await Estudiantes.updateOne({ nombre: 'Lucas', apellido: 'Blanco' },
      {
        $set: {
          dni: '20355875',
        },
      }
    );
}
// update();

// Agregar un campo 'ingreso' a todos los documentos con el valor false

const updateMany = async() => {
    await Estudiantes.updateMany({}, {ingreso: false});
}
// updateMany();

// Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A

const update1A = async() => {
    await Estudiantes.updateMany({curso: '1A'}, {$set: {ingreso: true}});
}

// update1A();

// Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
const readAprobados = async() => {
    const listaEstudiantes = await Estudiantes.find({nota: {$gte: 4}}, {_id: false, __v: false});
    console.log(listaEstudiantes);
}

// readAprobados();

// Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
const readIngreso = async() => {
    const listaEstudiantes = await Estudiantes.find({ingreso: true}, {_id: false, __v: false});
    console.log(listaEstudiantes);
}
// readIngreso();

// Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true

const deleteIngreso = async() => {
    await Estudiantes.deleteMany({ingreso: true});
}

// deleteIngreso();

// Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS. 

const readConHora = async() => {
    const listaEstudiantes = await Estudiantes.find({}, {__v: false});
    const estudiantesConHora = [];

    for (const estudiante of listaEstudiantes) {
        estudiantesConHora.push({
            _id: estudiante._id.toString(),
            nombre: estudiante.nombre,
            apellido: estudiante.apellido,
            edad: estudiante.edad,
            dni: estudiante.dni,
            curso: estudiante.curso,
            nota: estudiante.nota,
            ingreso: estudiante.ingreso,
            fechaCreacion: estudiante._id.getTimestamp()
        })
        
    }
    console.log(estudiantesConHora);
}

readConHora();