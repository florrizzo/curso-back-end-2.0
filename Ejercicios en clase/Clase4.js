// Ejercicio 1
// const fs = require('fs');

// try{
//     fs.writeFileSync('./fyh.txt', Date());
//     const data = fs.readFileSync('./fyh.txt','utf-8');
//     console.log(data);
// } catch (error){
//     console.log(error);
// }


// Ejercicio 2
const fs = require('fs');
let persona;

async function leer(func){
    try {
        persona = await fs.promises.readFile('./info.txt', 'utf-8');
        persona = await JSON.parse(persona);
        console.log(persona);
    }
    catch {
        console.log('Se produjo un error');
    }
    
    func()
}

async function modificarId(){
    persona.id = 2;
    personaJSON = JSON.stringify(persona);
    try {
        await fs.promises.writeFile('./info.txt', personaJSON);
        console.log('Se modifico el archivo del objeto correctamente')
    }
    catch {
        console.log('Se produjo un error')
    }
}

leer(modificarId);


