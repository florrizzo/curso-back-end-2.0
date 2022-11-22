const fs = require('fs');
let productos = JSON.parse(fs.readFileSync("./productos.txt"));

class Contenedor {
    constructor(){
        this.filePath = "./productos.txt";        
    }

    async save(timestamp, nombre, descripcion, codigo, foto, precio, stock){
        try {
            let highestid = Math.max(...productos.map((el) => el.idProducto));
            let idProducto = highestid + 1;
            let productoNuevo = {"idProducto": idProducto, "timestamp": timestamp, "nombre": nombre, "descripcion": descripcion, "codigo": codigo, "foto": foto, "precio": precio, "stock": stock};
            productos = productos.concat(productoNuevo);
            console.log(`Se añadió el producto ${productoNuevo.nombre} a la lista`);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
            return idProducto;
        } catch {
            console.log('Se ha producido un error');
        }
    }

    async replace(num, timestamp, nombre, descripcion, codigo, foto, precio, stock){
        const index = productos.findIndex(object => object.idProducto == num);
            if (productos[index]){
                try {
                    const productoNuevo = {"idProducto": num, "timestamp": timestamp, "nombre": nombre, "descripcion": descripcion, "codigo": codigo, "foto": foto, "precio": precio, "stock": stock};
                    const indice = productos.map(object => object.idProducto).indexOf(num);
                    productos[indice] = productoNuevo;
                    console.log(`Se añadió el producto ${productoNuevo.nombre} a la lista`);
                    await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
                } catch {
                    console.log('Se ha producido un error');
                }
            } else {
                console.log('No existe el número de id elegido');
            }          
    }

    getById(num){
        try{
            const index = productos.findIndex(object => object.idProducto == num);
            if (productos[index]){
                return productos[index];
            } else {
                console.log('No existe el número de id elegido');
            }            
        } catch {
            console.log('Se ha producido un error');
        } 
    }

    getAll(){        
        return productos        
    }

    async deleteById(num){
        try{
            const index = productos.map(object => object.idProducto).indexOf(num);
            productos.splice(index, 1);
            console.log(productos);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
        } catch {
            console.log('Se ha producido un error');
        }        
    }

    async deleteAll(){
        try{
            productos = [];
            console.log("Se borraron todos los productos");
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
        } catch {
            console.log('Se ha producido un error');
        }
    }
}

module.exports = Contenedor;

// productos.txt original:
// [
//     { "idProducto": 1, "timestamp": "", "nombre": "Red Velvet", "descripcion": "", "codigo": 3245, "foto": "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg", "precio": 2000, "stock": 10 },
//     { "idProducto": 2, "timestamp": "", "nombre": "Budín de limon", "descripcion": "", "codigo": 3223, "foto": "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png", "precio": 1000, "stock": 15 },
//     { "idProducto": 3, "timestamp": "", "nombre": "Brownie", "descripcion": "", "codigo": 3251, "foto": "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG", "precio": 1500, "stock": 12 }
// ]

