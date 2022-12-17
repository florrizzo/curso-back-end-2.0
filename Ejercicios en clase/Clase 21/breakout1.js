const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

const random = (array) => {
    const number = array.length;
    const random = Math.floor(Math.random() * number);
    return array[random]
}

app.get('/test', (req, res) => {
    const nombre = random(nombres);
    const apellido = random(apellidos);
    const color = random(colores);
    res.json(nombre + " " + apellido + " " + color);
})