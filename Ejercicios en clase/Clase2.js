// Ejercicio 1 - Funciones y Closures
// Definir la función mostrarLista que reciba un array y lo recorra mostrando todos sus tiems. 
// Invocarla con datos de prueba para verificar que funciona bien.

const mostrarLista = (array) => {
    array.forEach(element => console.log(element));
}

mostrarLista(["Antes", "Que", "Nadie"]);

// Definir una función anónima que haga lo mismo que la del punto 1, 
// e invocarla inmediatamente, pasando un array con 3 números como argumento.

(function (array){
    array.forEach(element => console.log(element));
})([1,9,14]);

// Definir una función anónima y enviarla a otra función para que esta la ejecute.

function usandoFuncion(funcion){
    funcion();
}

usandoFuncion(() => console.log("Porque? no hay porque"));


// Ejercicio 2 - Clases

// En este ejercicio construiremos una herramienta que permita que diferentes personas 
// puedan llevar cuentas individuales sobre algo que deseen contabilizar, 
// al mismo tiempo que nos brinde una contabilidad general del total contado. Para ello:

// 1)   Definir la clase Contador.
// 2)   Cada instancia de contador debe ser identificada con el nombre de la persona responsable de ese conteo.
// 3)   Cada instancia inicia su cuenta individual en cero.
// 4)   La clase en sí misma posee un valor estático con el que lleva la cuenta de todo lo contado por sus instancias, el cual también inicia en cero.
// 4)   Definir un método obtenerResponsable que devuelva el nombre del responsable de la instancia.
// 5)   Definir un método obtenerCuentaIndividual que devuelva la cantidad contada por la instancia.
// 6)   Definir un método obtenerCuentaGlobal que devuelva la cantidad contada por todos los contadores creados hasta el momento.
// 7)   Definir el método contar que incremente en uno tanto la cuenta individual como la cuenta general

class Contador{
    constructor(responsable){
        this.personaResponsable = responsable;
        this.cuentaIndividual = 0;
    }

    static contadorGlobal = 0;

    obtenerResponsable(){
        console.log(this.personaResponsable);
    }

    obtenerCuentaIndividual(){
        console.log(this.cuentaIndividual);
    }

    obtenerCuentaGlobal(){
        console.log(Contador.contadorGlobal);
    }

    contar(){
        this.cuentaIndividual++;
        Contador.contadorGlobal++;
    }
}

const persona1 = new Contador("Florencia");
persona1.obtenerResponsable();
persona1.obtenerCuentaIndividual();
persona1.obtenerCuentaGlobal();
persona1.contar();
persona1.obtenerCuentaIndividual();
persona1.obtenerCuentaGlobal();

const persona2 = new Contador("Sofia");
persona2.contar();
persona1.obtenerCuentaIndividual();
persona1.obtenerCuentaGlobal();
