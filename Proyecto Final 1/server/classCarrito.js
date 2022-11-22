const fs = require('fs');
let carrito = JSON.parse(fs.readFileSync("./carrito.txt"));

class Carrito {
    constructor(){
        this.filePath = "./carrito.txt";        
    }

    getAll(){        
        return carrito        
    }

    async nuevoCarrito(timestampCarrito){
        try {
            let highestid = Math.max(...carrito.map((el) => el.idCarrito));
            let idCarrito = highestid + 1;
            let carritoNuevo = {"idCarrito": idCarrito, "timestampCarrito": timestampCarrito, "productos": []};
            carrito = carrito.concat(carritoNuevo);
            await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
            return idCarrito;
        } catch {
            console.log('Se ha producido un error');
        }
    }

    async deleteById(num){
        try{
            const index = carrito.map(object => object.idCarrito).indexOf(num);
            carrito.splice(index, 1);
            await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
        } catch {
            console.log('Se ha producido un error');
        }        
    }
    
    async agregarProducto(num, producto){
            const index = carrito.findIndex(object => object.idCarrito == num);
            console.log(carrito[0].productos)
            carrito[index].productos = carrito[index].productos.concat(producto);
            await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
    }

    async deleteProduct(num, id_prod){
        const index = carrito.findIndex(object => object.idCarrito == num);
        const indexProduct = carrito[index].productos.findIndex(object => object.idProducto == id_prod);
        carrito[index].productos.splice(indexProduct, 1);
        await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
    }
}

module.exports = Carrito;

// carrito.txt original:
// [{"idCarrito": 1,"timestampCarrito": "", "productos": [
//     { "idProducto": 1, "timestamp": "", "nombre": "Red Velvet", "descripcion": "", "codigo": 3245, "foto": "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg", "precio": 2000, "stock": 10 },
//     { "idProducto": 2, "timestamp": "", "nombre": "Budín de limon", "descripcion": "", "codigo": 3223, "foto": "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png", "precio": 1000, "stock": 15 },
//     { "idProducto": 3, "timestamp": "", "nombre": "Brownie", "descripcion": "", "codigo": 3251, "foto": "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG", "precio": 1500, "stock": 12 }
// ]}]
