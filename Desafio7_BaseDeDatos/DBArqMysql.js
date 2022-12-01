const { options } = require('./options/mysql.js');
const knex = require('knex')(options);

// CREAR TABLA DE PRODUCTOS
knex.schema
  .createTable('productos', (table) => {
    table.increments('id'),
      table.string('title'),
      table.integer('price'),
      table.string('thumbnail');
  })
  .then(() => {
    console.log('Se creó la tabla de productos');
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });

// INSERTAR 
knex("productos")
    .insert([{title: "Red Velvet", price: 2000, thumbnail: "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg"},
    {title: "Budín de limon", price: 1000, thumbnail: "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png"},
    {title: "Brownie", price: 2000, thumbnail: "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG"}])
    .then(() => {
        console.log("Logre insertar los productos");
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });

// SELECT
knex
    .from("productos")
    .select("*")
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    })
    .finally(() => {
        knex.destroy();
    })