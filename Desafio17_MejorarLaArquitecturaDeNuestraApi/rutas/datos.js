const Router = require("express");
const routerDatos = new Router();
const routes = require("../controlador/datos");
const passport = require("passport");

routerDatos.get("/", routes.checkAuthentication, routes.getMain);

routerDatos.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);

routerDatos.get("/login", routes.getLogin);

routerDatos.get("/register", routes.getRegister);

routerDatos.post(
  "/register",
  passport.authenticate("signup", { failureRedirect: "/failRegister" }),
  routes.postSignup
);

routerDatos.post(
  "/enviarCarrito",
  routes.postEnviarCarrito
);

routerDatos.get("/failLogin", (req, res) => {
  res.render("failLogin");
});

routerDatos.get("/failRegister", (req, res) => {
  res.render("failRegister");
});

routerDatos.post('/buscadorproductos', routes.postProductFilter);
routerDatos.get('/buscadorproductos', (req, res) => {
  res.redirect("/");
});

routerDatos.post('/addToCart', routes.postAddToCart);

routerDatos.post('/deleteFromCart', routes.deleteFromCart);

routerDatos.post('/emptyCart', routes.postEmptyCart);


routerDatos.get("/showsession", (req, res) => {
  res.json(req.session);
});

routerDatos.get("/logout", routes.getLogout);

routerDatos.get("/info", routes.getInfo);

module.exports = routerDatos