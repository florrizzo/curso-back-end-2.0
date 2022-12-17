const express = require("express");
// Routers para guardar en Archivo
// const routerCarrito = require("./routes/routerCarritoArchivo");
// const routerProductos = require("./routes/routerProductosArchivo");

// Routers para guardar en Memoria
// const routerCarrito = require("./routes/routerCarritoMemoria");
// const routerProductos = require("./routes/routerProductosMemoria");

// Routers para guardar en MongoDB
const routerCarrito = require("./routes/routerCarritoMongoDB");
const routerProductos = require("./routes/routerProductosMongoDB");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static("public"));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.listen(PORT, () =>
  console.log(`Se muestra en el puerto http://localhost:${PORT} `)
);

app.get("/", (req, res) => {
  res.json("Entraste a la página de Date el gusto!");
});

app.get("/*", (req, res) => {
  res.json({ error: true, descripcion: "ruta no encontrada" });
});
