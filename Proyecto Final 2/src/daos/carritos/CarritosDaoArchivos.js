const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./src/db/carrito.txt")
    }
}

module.exports = CarritosDaoArchivo;