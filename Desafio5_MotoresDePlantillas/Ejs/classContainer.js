const fs = require('fs');
let productos = JSON.parse(fs.readFileSync("./productos.txt"));

class Contenedor {
    constructor(){
        this.filePath = "./productos.txt";        
    }

    async save(nombre, precio, url){
        try {
            let highestid = Math.max(...productos.map((el) => el.id));
            let id = highestid + 1;
            let productoNuevo = {"id": id, "title": nombre, "price": precio, "thumbnail": url};
            productos = productos.concat(productoNuevo);
            console.log(`Se añadió el producto ${productoNuevo.title} a la lista`);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
            return id;
        } catch {
            console.log('Se ha producido un error');
        }
    }

    async replace(num, nombre, precio, url){
        try {
            const productoNuevo = {"id": num, "title": nombre, "price": precio, "thumbnail": url};
            const indice = productos.map(object => object.id).indexOf(num);
            productos[indice] = productoNuevo;
            console.log(`Se añadió el producto ${productoNuevo.title} a la lista`);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
        } catch {
            console.log('Se ha producido un error');
        }
    }

    getById(number){
        try{
            const index = productos.map(object => object.id).indexOf(number);
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

    async deleteById(number){
        try{
            const index = productos.map(object => object.id).indexOf(number);
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

const contenedor = new Contenedor();

module.exports = Contenedor;

// productos.txt original:

// [
//     { "id": 1, "title": "Red Velvet", "price": 2000, "thumbnail": "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg" },
//     { "id": 2, "title": "Budín de limon", "price": 1000, "thumbnail": "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png"},
//     { "id": 3, "title": "Brownie", "price": 1500, "thumbnail": "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG"}
// ]

