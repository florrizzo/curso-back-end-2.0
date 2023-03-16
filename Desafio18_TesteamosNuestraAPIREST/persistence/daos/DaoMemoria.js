class ContenedorMemoria {
  constructor(list) {
    this.list = list;
  }

  async getAll() {
    return this.list;
  }

  async getById(id) {
    try {
      const index = this.list.findIndex((object) => object._id == id);
      const resultado = [];
      if (this.list[index]) {
        resultado.push(this.list[index]);
        return resultado;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  async getByName(name) {
    try {
      const index = this.list.findIndex(
        (object) => object.title.toLowerCase() == name.toLowerCase()
      );
      const resultado = [];
      if (this.list[index]) {
        resultado.push(this.list[index]);
        return resultado;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  async save(title, thumbnail, price) {
    try {
      const lista = this.list;
      let highestid = Math.max(...lista.map((el) => el._id));
      let id = highestid + 1;
      let productoNuevo = {
        _id: id,
        title: title,
        thumbnail: thumbnail,
        price: price,
      };
      this.list.push(productoNuevo);
      return productoNuevo;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async replace(id, title, thumbnail, price) {
    try {
      const lista = this.list;
      const index = lista.findIndex((object) => object._id == id);
      if (lista[index]) {
        const productoNuevo = {
          _id: id,
          title: title,
          thumbnail: thumbnail,
          price: price,
        };
        this.list[index] = productoNuevo;
        return productoNuevo;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async deleteById(id) {
    try {
      let lista = this.list;
      const index = lista.findIndex((object) => object._id == id);
      if (lista[index]) {
        this.list.splice(index, 1);
        return `Se eliminó con exito`;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }
}

let instanceProduct = null;
class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super([
      {
        _id: 1,
        title: "Red Velvet",
        thumbnail:
          "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg",
        price: 2000,
      },
      {
        _id: 2,
        title: "Budín de limon",
        thumbnail:
          "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png",
        price: 1000,
      },
      {
        _id: 3,
        title: "Brownie",
        thumbnail:
          "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG",
        price: 1500,
      },
    ]);
  }

  static getInstance() {
    if (!instanceProduct) {
      instanceProduct = new ProductosDaoMemoria();
    }
    return instanceProduct;
  }
}

module.exports = [ProductosDaoMemoria];
