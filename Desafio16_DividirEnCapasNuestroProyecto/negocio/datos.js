const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");
const CarritosDaoMongoDB = require("../daos/CarritosDaoMongoDB");
const contenedor = new ProductosDaoMongoDB();
const contenedorCarrito = new CarritosDaoMongoDB();
const logger = require("../config/logger");

/* Nodemailer */
const { createTransport } = require("nodemailer");

const TEST_MAIL = process.env.AdminMail || "florenciam.rizzo@hotmail.com";
const mailUser = process.env.Ethereal_Mail || "hailey.brown@ethereal.email";
const mailPass = process.env.Ethereal_Pass || "s6hb6pXVzFcPtsHGgC";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

async function datosMain(username, datosUsuario, productosEncontrados) {
  const productos = await contenedor.getAll();
  const cartProducts = await contenedorCarrito.getCartProducts(username);
  let sum = 0;
  if (cartProducts.length > 0) {
    cartProducts.forEach((element) => {
      sum += element.price;
    });
  }
  const datos = {
    productos: productos,
    usuario: username,
    nombre: datosUsuario.nombre,
    direccion: datosUsuario.direccion,
    edad: datosUsuario.edad,
    telefono: datosUsuario.telefono,
    url: datosUsuario.url,
    productosEncontrados: [],
    productosCarrito: cartProducts,
    total: sum,
  };

  if (productosEncontrados) {
    productosEncontrados.forEach((element) => {
      datos.productosEncontrados.push(element);
    });
  }

  return datos;
}

async function enviarCarrito(username, nombre, telefono) {
  let carrito = await contenedorCarrito.getCartProducts(username);
  let htmlcarrito = "";
  let wappcarrito = "";
  let sum = 0;
  for (let i = 0; i < carrito.length; i++) {
    sum += parseInt(carrito[i].price);
    htmlcarrito += `
        <div> ${carrito[i].title} - $ ${carrito[i].price}</div>`;
    wappcarrito += `
        ${carrito[i].title} - $ ${carrito[i].price}`;
  }
  htmlcarrito += `<div> <em> Total: - $ ${sum} <em/> <div/>`;
  wappcarrito += `Total: - $ ${sum}`;
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido de " + nombre + ": " + username,
    html: `<h1>El usuario ${nombre} realizó el siguiente pedido:</h1>
    <p>${htmlcarrito}</p>`,
  };

  try {
    const enviarMail = async () => {
      const info = await transporter.sendMail(mailOptions);
      logger.log("info", info);
    };
    enviarMail();
  } catch (err) {
    logger.log("error", err);
  }

  /* Twilio */
  const twilio = require("twilio");

  const accountSid =
    process.env.Twilio_accountSid || "AC4a83255eb09003b2b25ede9b56db27f6";
  const authToken = process.env.Twilio_authToken;
  const fields = telefono.split("-");
  let userPhone = "+" + fields[0] + fields[1];
  /* Numero verificado en Twilio*/
  userPhone = "+543487660828";

  const adminPhone = process.env.Twilio_adminPhone || "+5493487660828";

  const client = twilio(accountSid, authToken);

  /* Twilio Wapp a administrador*/
  client.messages
    .create({
      body: `El usuario ${username} realizó el siguiente pedido:
         ${wappcarrito}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + adminPhone,
    })
    .then((message) => logger.log("info", message.sid));

  /* Twilio SMS a usuario*/
  try {
    const enviarSMS = async () => {
      const message = await client.messages.create({
        body: "Tu pedido a Date el gusto se realizó con éxito!",
        from: "+14244849354",
        to: userPhone,
      });
      logger.log("info", message);
    };
    enviarSMS();
  } catch (error) {
    logger.log("error", err);
  }
}

async function signUpMail(username) {
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo registro",
    html:
      '<h1 style="color: blue;">Se registró un usuario nuevo: <span style="color: green;">' +
      username +
      "</span></h1>",
  };

  try {
    const enviarMail = async () => {
      const info = await transporter.sendMail(mailOptions);
      logger.log("info", info);
    };
    enviarMail();
  } catch (err) {
    logger.log("error", err);
  }
}

async function agregarCarrito(product, username) {
  let addProduct = await contenedor.getByName(product);
  await contenedorCarrito.addToCart(username, addProduct[0]);
}

async function vaciarCarrito(username) {
  await contenedorCarrito.emptyCart(username);
}

async function eliminarDeCarrito(product, username) {
  let deleteProduct = await contenedor.getByName(product);
  await contenedorCarrito.deleteFromCart(username, deleteProduct[0]);
}

async function buscarProducto(product) {
  if (!contenedor.getByName(product)) {
    return false;
  } else {
    let resultado = await contenedor.getByName(product);
    return resultado;
  }
}

module.exports = {
  datosMain,
  enviarCarrito,
  signUpMail,
  agregarCarrito,
  vaciarCarrito,
  eliminarDeCarrito,
  buscarProducto,
};