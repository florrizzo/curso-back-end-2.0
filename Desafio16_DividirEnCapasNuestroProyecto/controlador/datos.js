const service = require("../negocio/datos");

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

async function getMain(req, res) {
  const { username, password } = req.user;
  const datos = await service.datosMain(
    username,
    req.user,
    req.body.productosEncontrados
  );

  res.render("productslists", datos);
}

async function postEnviarCarrito(req, res) {
  const { username, nombre, telefono } = req.user;
  service.enviarCarrito(username, nombre, telefono);
  res.render("cartSent");
}

function postSignup(req, res) {
  const { username, password, nombre } = req.user;
  service.signUpMail(username);
  res.redirect("/");
}

function getLogin(req, res) {
  res.render("login");
}

function getRegister(req, res) {
  res.render("register");
}

function postLogin(req, res) {
  const { username, password } = req.user;
  res.redirect("/");
}

function getLogout(req, res) {
  const { username, password } = req.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("No se pudo deslogear");
    } else {
      res.render("logout", { usuario: username });
    }
  });
}

function getInfo(req, res) {
  res.send(`
    Argumentos de entrada: ${process.argv.slice(2)}
    Nombre de la plataforma (sistema operativo): ${process.platform}
    Versión de node: ${process.version}
    Memoria total reservada (rss): ${process.memoryUsage.rss()}
    Path de ejecución: ${process.cwd()}
    ID del proceso: ${process.pid}`);
}

async function postProductFilter(req, res) {
  const { buscadorProducto } = req.body;
  let resultado = await service.buscarProducto(buscadorProducto);
  if (resultado){
    req.body.productosEncontrados = resultado;
    getMain(req, res);
  } else {
    res.redirect("/");
  }
}

async function postAddToCart(req, res) {
  await service.agregarCarrito(req.body.addcart, req.user.username);
  res.redirect("/");
}

async function postEmptyCart(req, res) {
  await service.vaciarCarrito(req.user.username);
  res.redirect("/");
}

async function deleteFromCart(req, res) {
  await service.eliminarDeCarrito(req.body.deletefromcart, req.user.username);
  res.redirect("/");
}

module.exports = {
  checkAuthentication,
  postSignup,
  getLogin,
  getRegister,
  postLogin,
  getMain,
  getLogout,
  getInfo,
  postEnviarCarrito,
  postProductFilter,
  postAddToCart,
  postEmptyCart,
  deleteFromCart,
};
