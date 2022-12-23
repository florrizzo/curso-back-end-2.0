import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

import faker from 'faker';
faker.locale = 'es';
const { name, internet, random } = faker;
import { writeFile } from 'fs';

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get('/test/', (req, res) => {
    const cant = req.query.cant
    res.send(randomFaker(cant));
  });

function randomFaker(cant){
    const {name, internet} = faker;
    const arrayAux = [];

    const cantidad = cant || 10;
    for (let i = 0; i < cantidad; i++){
        const objeto ={id: i+1, nombre: name.firstName(), apellido: name.lastName()}

        arrayAux.push(objeto)
    }
    return arrayAux
}