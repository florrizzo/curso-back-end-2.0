import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../privi.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("me conecte");
const db = getFirestore();

function validacionId(array, id){
  array = array.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }
  async getAll() {
    const res = await this.coleccion.get();
    let arrayRes = res.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return arrayRes;
  }

  async getById(num) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion){
      let resultado = await this.coleccion.doc(num).get()
      return resultado
    } else {
      return "No existe el número de id elegido";
    }
  }

  async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
    try {
      let res;

      res = await this.coleccion.add({
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      });
      console.log(res.id)
      return res.id;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async replace(
    num,
    timestamp,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock
  ) {
    
  }

  async deleteById(num) {
    
  }

  async addCart(timestamp) {
    
  }

  async getProductsFromCart(id) {

  }

  async addProductToCart(num, producto) {
    
  }

  async deleteProductFromCart(num, id_prod) {
    
  }
}

export { ContenedorFirebase };
