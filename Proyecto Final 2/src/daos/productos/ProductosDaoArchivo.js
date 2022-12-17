const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./src/db/productos.txt")
    }
}

module.exports = ProductosDaoArchivo;