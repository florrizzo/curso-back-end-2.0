const service = require("../negocio/datos");

async function postEnviarCarrito(req, res) {
  const { username, nombre, telefono } = req.user;
  service.enviarCarrito(username, nombre, telefono);
  res.render("cartSent");
}

async function postAddToCart(req, res) {
  await service.agregarCarrito(req.body.addcart, req.user.username);
  res.redirect("/usuarios/");
}

async function postEmptyCart(req, res) {
  await service.vaciarCarrito(req.user.username);
  res.redirect("/usuarios/");
}

async function deleteFromCart(req, res) {
  await service.eliminarDeCarrito(req.body.deletefromcart, req.user.username);
  res.redirect("/usuarios/");
}

module.exports = {
  postEnviarCarrito,
  postAddToCart,
  postEmptyCart,
  deleteFromCart,
};
