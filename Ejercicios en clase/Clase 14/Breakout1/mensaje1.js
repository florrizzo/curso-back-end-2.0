const { mensaje2 } = require("./mensaje2.js");
const { mensaje3 } = require("./mensaje3.js");

const mensaje1 = "Este es mi primer mensaje";

setTimeout(()=>{
    console.log(mensaje1);
}, 1000)

setTimeout(()=>{
    console.log(mensaje2);
}, 2000)

setTimeout(()=>{
    console.log(mensaje3);
}, 3000)
