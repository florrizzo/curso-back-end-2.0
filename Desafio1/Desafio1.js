class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`);
    }
    addMascota(mascotaNueva){
        this.mascotas.push(mascotaNueva);
        console.log(this.mascotas);
    }
    countMascotas(){
        console.log(this.mascotas.length);
    }
    addBook(nombreLibro, autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro});
        console.log(this.libros);
    }
    getBookNames(){
        let nombresLibros = this.libros.map(el => el.nombre);
        console.log(nombresLibros);
    }
}

let usuario1 = new Usuario("Florencia", "Rizzo", 
[{nombre: "El señor de los anillos", autor: "Tolkien"},
{nombre: "Arde la vida", autor: "Magalí Tajes"},
{nombre: "Habitación propia", autor: "Virginia Woolf"}],
["Mia", "Arya", "Zelda"]);

usuario1.getFullName();
usuario1.addMascota("Lizzy");
usuario1.countMascotas();
usuario1.addBook("Bajo la misma estrella", "John Green");
usuario1.getBookNames();

