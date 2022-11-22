// Ejercicio 1
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

// inciso A
let nombres = productos[0].nombre;
for (let i = 1; i < productos.length; i++){
    nombres = nombres + ' , ' + productos[i].nombre;
}

// inciso B
let total = 0;
productos.forEach(element => { 
    total = total + element.precio;
    return total
});

// inciso C
let promedio = total / productos.length;

// incisos D y E
const aux = [];
productos.forEach(element => {
    aux.push(element.precio);
})

const menor = Math.min(...aux);
const mayor = Math.max(...aux);

// inciso F
const resultado = {'A': nombres, 'B': total.toFixed(2), 'C': promedio.toFixed(2), 'D': menor.toFixed(2), 'E': mayor.toFixed(2)}
console.log(resultado);


// Ejercicio 2
const moment = require('moment');
const ahora = moment().format('YYYY-MM-DD'); 
const nacimiento = '1994-02-25';
const diferenciaYears = moment().diff(nacimiento,'years');
const diferenciaDays = moment().diff(nacimiento,'days');

console.log(`Hoy es ${ahora}`);
console.log(`Nací el ${nacimiento}`);
console.log(`Desde que nací han pasado ${diferenciaYears} años`);
console.log(`Desde que nací han pasado ${diferenciaDays} días`);
