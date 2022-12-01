const { options } = require('./options/sqlite.js');
const knex = require('knex')(options);

// CREAR TABLA DE MENSAJES
knex.schema
  .createTable('mensajes', (table) => {
    table.increments('id'), table.string('email'), table.string('fecha'), table.string('mensaje');
  })
  .then(() => {
    console.log('Se creó la tabla Historial de mensajes');
  })
  .catch((err) => {
        console.log(err);
    throw new Error(err);
  })
  .finally(() => {
        knex.destroy();
      });

// INSERTAR
knex("mensajes")
  .insert({email: "flor.rizzo@gmail.com", fecha: "30/11/22 23:17:00", mensaje: "Primer mensaje"})
  .then(() => {
      console.log("Se agrego un mensaje nuevo");
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
      knex.destroy();
  });
