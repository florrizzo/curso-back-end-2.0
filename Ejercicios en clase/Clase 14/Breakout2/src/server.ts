import express from 'express';
import Superficie from './Superficie';
import Perimetro from './Perimetro';

const app = express();

app.get('/perimetro', (req, res) => {
  // let {num1} = req.params;
  // num2 = parseInt(num1);
  // let {num2} = req.params;
  // num2 = parseInt(num2);
  let perimetro1 = new Perimetro(5, 15);
  let resultado1 = perimetro1.cuadrado();
  let resultado2 = perimetro1.triangulo();
  res.json('El perimetro del cuadrado es: ' + resultado1 + 'El perimetro del triangulo es: ' + resultado2);
});

app.get('/superficie', (req, res) => {
  // let {num1} = req.params;
  // num2 = parseInt(num1);
  // let {num2} = req.params;
  // num2 = parseInt(num2);
  let superficie1 = new Superficie(5, 15);
  let resultado1 = superficie1.cuadrado();
  let resultado2 = superficie1.triangulo();
  res.json('El perimetro del cuadrado es: ' + resultado1 + 'El perimetro del triangulo es: ' + resultado2);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`conectado al puerto: ${PORT}`);
});
