import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

const schema = buildSchema(`
  type Producto {
    id: ID!
    nombre: String,
    url: String,
    descripcion: String,
    precio: Int
  }
  input ProductoInput {
    nombre: String,
    url: String,
    descripcion: String,
    precio: Int
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);

const app = express();

// app.use(express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProductos,
      getProducto,
      createProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: ${PORT}`;
  console.log(msg);
});

class Producto {
  constructor(id, { nombre, url, descripcion, precio }) {
    this.id = id;
    this.nombre = nombre;
    this.url = url;
    this.descripcion = descripcion,
    this.precio = precio
  }
}

const productosMap = {};

productosMap["2460343e060579d8e4e2"] = new Producto ("2460343e060579d8e4e2", {nombre: "Red Velvet", descripcion: "Pastel de terciopelo rojo", url: "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg", precio: 1700 } );
productosMap["2144b8e10efec7af1f33"] = new Producto ("2144b8e10efec7af1f33", {nombre: "Budín de limon", descripcion: "Alimento de la cocina inglesa", url: "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png", precio: 580 } );
productosMap["439ccbc7a9d139b0696d"] = new Producto ("439ccbc7a9d139b0696d", {nombre: "Brownie", descripcion: "Bizcocho de chocolate pequeño", url: "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG", precio: 1500 } );
productosMap["95eaf571e31d78a3a98a"] = new Producto ("95eaf571e31d78a3a98a", {nombre: "Tres leches", descripcion: "Pastel frio", url: "https://st2.depositphotos.com/27072770/50262/i/450/depositphotos_502620128-stock-photo-three-milk-cake-traditional-dessert.jpg", precio: 3500 } );
productosMap["f6b9ee173fb105a8c1c2"] = new Producto ("f6b9ee173fb105a8c1c2", {nombre: "Marquesa", descripcion: "Torta fria", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5YerPs5-__GOUr0_C1m2va4ZHmmkqTqDrog&usqp=CAU", precio: 4990 } );


function getProductos({ campo, valor }) {
  const productos = Object.values(productosMap);
  if (campo && valor) {
    return productos.filter((p) => p[campo] == valor);
  } else {
    return productos;
  }
}

function getProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found.");
  }
  return productosMap[id];
}

function createProducto({ datos }) {
  const id = crypto.randomBytes(10).toString("hex");
  const nuevoProducto = new Producto(id, datos);
  productosMap[id] = nuevoProducto;
  return nuevoProducto;
}

function updateProducto({ id, datos }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoActualizado = new Producto(id, datos);
  productosMap[id] = productoActualizado;
  return productoActualizado;
}

function deleteProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoBorrada = productosMap[id];
  delete productosMap[id];
  return productoBorrada;
}