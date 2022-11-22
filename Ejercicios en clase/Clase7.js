// Ejercicio 1
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const frase = 'Hola mundo cómo están'

app.get('/api/frase', (req, res) => {
  res.json(frase);
});

app.get('/api/letras/:num', (req, res) => {
    let {num} = req.params;
    if (!num.match(/^\d+/)){
      res.json('error: "El parámetro no es un número"')
    } else if(parseInt(num) > frase.length){
      res.json('error: "El parámetro está fuera de rango"')
    } else {
      num = parseInt(num);
      res.json("letra: " + frase[num-1]); 
    }
});

app.get('/api/palabras/:num', (req, res) => {
    let {num} = req.params;
    let palabras = frase.split(" ");  
    if (!num.match(/^\d+/)){
      res.json('error: "El parámetro no es un número"')
    } else if(parseInt(num) > palabras.length){
      res.json('error: "El parámetro está fuera de rango"')
    } else {
      num = parseInt(num);
      res.json("palabra: " + palabras[num-1]);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});


// Ejercico 2

app.get('/api/sumar/:num1/:num2', (req, res) => {
  let {num1} = req.params;
  num1 = parseInt(num1);
  let {num2} = req.params;
  num2 = parseInt(num2);
  let sumar = num1 + num2;
  res.json('La suma es: ' + sumar);
});

app.get('/api/sumar/', (req, res) => {
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);
  let sumar = num1 + num2;
  res.json('La suma es: ' + sumar)
});

// inciso c,, no seeeeeeeeeeeee
// app.get('/api/operacion', (req, res) => {
//   let test = req.query;
//   res.json('npi');
// });