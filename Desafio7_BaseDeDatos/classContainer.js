const { options } = require('./options/mysql.js');
const knex = require('knex')(options);

class Contenedor {
  async save(nombre, precio, url) {
    try {
      await knex('productos').insert({
        title: nombre,
        price: precio,
        thumbnail: url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let productos = await knex('productos').select('*');
      return productos;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
