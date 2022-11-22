const http = require("http");
const PORT = 8080;
const moment = require('moment')
const server = http.createServer((req, res) => {
    let hora = moment().hour()
    if (hora > 5 && hora < 13){
        res.end('Buenos días');
    } else if (hora >= 13 && hora < 19) {
        res.end('Buenas tardes');
    } else {
        res.end('Buenas noches');
    }
});

server.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto http://localhost:${PORT}`);
});

