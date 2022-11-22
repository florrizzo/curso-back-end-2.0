// Definir variables variables que almacenen los siguiente datos:
// Un nombre: “pepe”
// Una edad: 25
// Un precio: $99.90
// Los nombres de mis series favoritas: “Dark”, “Mr Robot”, “Castlevania”
// Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.
let nombre = "pepe";
let edad = 25;
let precio = "$99.9$";
let series = ["Dark", "Mr. Robot", "Castlevania"];
let peliculas = [{name: "Harry potter", year: 1994, characters: "Harry, Ron, Hermione"},{name: "Juego de Gemelas", year: 1999, characters: "Annie, Hallie"},{name: "Volver al futuro", year: 1985, characters: "Marty, Doc"}];

// Mostrar todos esos valores por consola
console.log(nombre);
console.log(edad);
console.log(precio);
console.log(series);
console.log(peliculas);

// Incrementar la edad en 1 y volver a mostrarla
edad++;
console.log(edad);

// Agregar una serie a la lista y volver a mostrarla
series = [...series, "Sex Education"];
console.log(series);