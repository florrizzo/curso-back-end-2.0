import express from "express";
import routerCarrito from "./routes/routerCarritos.js";
import routerProductos from "./routes/routerProductos.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static(__dirname + "/public"));
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
