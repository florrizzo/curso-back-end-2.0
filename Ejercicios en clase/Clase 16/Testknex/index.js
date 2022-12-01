// const { options } = require('./options/mysql.js');
const { options } = require('./options/sqlite.js');
const knex = require('knex')(options);



// CREAR TABLA
// knex.schema
//   .createTable('cars', (table) => {
//     table.increments('id'), table.string('brand'), table.string('model'), table.integer('price');
//   })
//   .then(() => {
//     console.log('todo bien');
//   })
//   .catch((err) => {
//         console.log(err);
//     throw new Error(err);
//   })
//   .finally(() => {
//         knex.destroy();
//       });
    

// INSERTAR 
// knex("cars")
//     .insert({brand: "bmw", model: "m4", price: 20000 })
//     .then(() => {
//         console.log("Logre insertar auto");
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally(() => {
//         knex.destroy();
//     });


// SELECT
// knex
//     .from("cars")
//     .select("*")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((e) => {
//         console.log(e);
//     })
//     .finally(() => {
//         knex.destroy();
//     })


// DELETE
// knex
//     .from("cars")
//     .where("id", "=", 1)
//     .del()
//     .then(() => {
//         console.log("Borre bien");
//     })
//     .catch((e) => {
//         console.log(e);
//     })
//     .finally(() => {
//         knex.destroy();
//     })


// UPDATE
// knex
//     .from("cars")
//     .where("id", "=", 2)
//     .update({price: 2500})
//     .then(() => {
//         console.log("Producto actualizado");
//     })
//     .catch((e) => {
//         console.log(e);
//     })
//     .finally(() => {
//         knex.destroy();
//     })