const socket = io();

socket.on('connect', () => {
  console.log('me conecte!');
});

socket.on('product-list', (data) => {
  console.log(data);
  let html1 = `
            <h2>Lista de productos:</h1>                
            <div class="divTable">
                <div class="headRow">
                    <div  class="divCell"><p>Nombre</p></div>
                    <div  class="divCell"><p>Precio</p></div>
                    <div  class="divCell"><p>Foto</p></div>
                </div>`;
  let html2 = '';
  data.forEach((item) => {
    html2 += `        
                <div class="divRow">
                    <div class="divCell"><p>${item.title}</p></div>
                    <div class="divCell"><p>${item.price}</p></div>
                    <div class="divCell"><img class="pequeña" src="${item.thumbnail}" alt="imagen-producto"></div>
                </div>`;
  });
  document.getElementById('div-list-products').innerHTML =
    html1 + html2 + '</div>';
});

socket.on('msg-list', (data) => {
  let html = '';
  data.forEach((element) => {
    html += `
        <div> 
        <span class="bolded">${element.email}</span>: ${element.fecha} <em>${element.mensaje}</em>
        <div/>`;
  });
  document.getElementById('div-list-msgs').innerHTML = html;
});

function enviarMsg() {
  const email = document.getElementById('input-email').value;
  const msgParaEnvio = document.getElementById('input-msg').value;
  socket.emit('msg', { email: email, mensaje: msgParaEnvio });
}

function enviarProducto() {
  const title = document.getElementById('Title').value;
  const price = document.getElementById('Price').value;
  const URL = document.getElementById('URL').value;
  socket.emit('product', { title: title, price: price, thumbnail: URL });
}
