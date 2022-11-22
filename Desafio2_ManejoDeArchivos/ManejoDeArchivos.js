const fs = require('fs');
let productos = JSON.parse(fs.readFileSync("./productos.txt"));

class Contenedor {
    constructor(){
        this.filePath = "./productos.txt";        
    }

    async save(nombre, precio){
        try {
            let highestid = Math.max(...productos.map((el) => el.id));
            let id = highestid + 1;
            let productoNuevo = {"title": nombre, "price": precio, "id": id};
            productos = productos.concat(productoNuevo);
            console.log(`Se añadió el pokemon ${productoNuevo.title} a la lista`);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos));
        } catch {
            console.log('Se ha producido un error');
        }
    }

    getById(number){
        try{
            const index = productos.map(object => object.id).indexOf(number);
            if (productos[index]){
                console.log(productos[index]);
            } else {
                console.log('No existe el número de id elegido');
            }            
        } catch {
            console.log('Se ha producido un error');
        } 
    }

    getAll(){        
        console.log(productos);        
    }

    async deleteById(number){
        try{
            const index = productos.map(object => object.id).indexOf(number);
            productos.splice(index, 1);
            console.log(productos);
            await fs.writeFile(this.filePath, JSON.stringify(productos));
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

// contenedor.save("Bulbasaur", 300);
// contenedor.getAll();
// contenedor.getById(3);
// contenedor.deleteById(2);
// contenedor.deleteAll();



// productos.txt original:

// [
//   { "title": "Pikachu", "price": 100, "id": 1 },
//   { "title": "Furret", "price": 200, "id": 2 },
//   { "title": "Eevee", "price": 150, "id": 3 }
// ]

