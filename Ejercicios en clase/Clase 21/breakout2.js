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

let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR;';
const randomFaker = (num) => {

  for (let i = 0; i < num; i++) {
    str += 
      name.firstName() +
      ';' +
      name.lastName() +
      ';' +
      internet.email() +
      ';' +
      name.jobTitle() +
      ';' +
      random.locale() +
      '\n';
  }

  return str;
};

app.get('/test/:num', (req, res) => {
  let { num } = req.params;
  num = JSON.parse(num);
  res.json(randomFaker(num));
});

//la reespuesta de de todo lo ingresado agregando ademas el id

// writeFile("./test.csv", str, (err) => {
//   if (err) console.log(err);
//   console.log("archivo guardado");
// });
