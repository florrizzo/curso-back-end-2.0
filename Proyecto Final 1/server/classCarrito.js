const fs = require('fs');
let carrito = JSON.parse(fs.readFileSync('./carrito.txt'));

class Carrito {
  constructor() {
    this.filePath = './carrito.txt';
  }

  getAll() {
    return carrito;
  }

  getById(num) {
    try {
      const index = carrito.findIndex((object) => object.idCarrito == num);
      if (carrito[index]) {
        return carrito[index];
      } else {
        console.log('No existe el número de id elegido');
        return false;
      }
    } catch {
      console.log('Se ha producido un error');
    }
  }

  async nuevoCarrito(timestampCarrito) {
    try {
      let idCarrito;
      if (carrito.length > 0) {
        let highestid = Math.max(...carrito.map((el) => el.idCarrito));
        idCarrito = highestid + 1;
      } else {
        idCarrito = 1;
      }

      let carritoNuevo = {
        idCarrito: idCarrito,
        timestampCarrito: timestampCarrito,
        productos: [],
      };
      carrito = carrito.concat(carritoNuevo);
      await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
      return idCarrito;
    } catch {
      console.log('Se ha producido un error');
    }
  }

  async deleteById(num) {
    try {
      const index = carrito.map((object) => object.idCarrito).indexOf(num);
      if (carrito[index]) {
        carrito.splice(index, 1);
        await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
        return carrito[index];
      } else {
        console.log('No existe el número de id elegido');
        return false;
      }
    } catch {
      console.log('Se ha producido un error');
    }
  }

  async agregarProducto(num, producto) {
    const index = carrito.findIndex((object) => object.idCarrito == num);
    carrito[index].productos = carrito[index].productos.concat(producto);
    await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
  }

  async deleteProduct(num, id_prod) {
    const index = carrito.findIndex((object) => object.idCarrito == num);
    const indexProduct = carrito[index].productos.findIndex(
      (object) => object.idProducto == id_prod
    );
    carrito[index].productos.splice(indexProduct, 1);
    await fs.promises.writeFile(this.filePath, JSON.stringify(carrito));
  }
}

module.exports = Carrito;

// carrito.txt original:
// [{"idCarrito": 1,"timestampCarrito": "22 / 11 / 2022, 11:26:32", "productos": [
//   { "idProducto": 1, "timestamp": "22 / 11 / 2022, 11:28:34", "nombre": "Red Velvet", "descripcion": "Pastel de terciopelo rojo", "codigo": 3245, "foto": "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg", "precio": 2000, "stock": 10 },
//   { "idProducto": 2, "timestamp": "22 / 11 / 2022, 11:32:41", "nombre": "Budín de limon", "descripcion": "Alimento de la cocina inglesa", "codigo": 3223, "foto": "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png", "precio": 1000, "stock": 15 },
//   { "idProducto": 3, "timestamp": "22 / 11 / 2022, 11:44:22", "nombre": "Brownie", "descripcion": "Bizcocho de chocolate pequeño", "codigo": 3251, "foto": "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG", "precio": 1500, "stock": 12 }
// ]},
// {"idCarrito": 2,"timestampCarrito": "22 / 11 / 2022, 11:48:22", "productos": [
//   { "idProducto": 1, "timestamp": "22 / 11 / 2022, 11:49:32", "nombre": "Red Velvet", "descripcion": "Pastel de terciopelo rojo", "codigo": 3245, "foto": "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg", "precio": 2000, "stock": 10 },
//   { "idProducto": 2, "timestamp": "22 / 11 / 2022, 11:53:41", "nombre": "Budín de limon", "descripcion": "Alimento de la cocina inglesa", "codigo": 3223, "foto": "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png", "precio": 1000, "stock": 15 },
//   { "idProducto": 3, "timestamp": "22 / 11 / 2022, 11:55:22", "nombre": "Brownie", "descripcion": "Bizcocho de chocolate pequeño", "codigo": 3251, "foto": "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG", "precio": 1500, "stock": 12 }
// ]}]
