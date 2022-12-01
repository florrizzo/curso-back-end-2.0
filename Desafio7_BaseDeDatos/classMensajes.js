const { options } = require('./options/sqlite.js');
const knex = require('knex')(options);

class Mensajes {
    async getAll() {
        try {
            const messages = await knex("mensajes").select("*");
            if (messages.length > 0) {
                return messages;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(email, fecha, mensaje) {
        try {
            await knex('mensajes').insert({
              email: email,
              fecha: fecha,
              mensaje: mensaje,
            });
          } catch (error) {
            console.log(error);
          }
    }

}


module.exports = Mensajes;
