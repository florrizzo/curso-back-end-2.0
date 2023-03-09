const Router = require("express");
const routerUsuarios = new Router();
const routes = require("../controlador/usuarios");
const passport = require("passport");

routerUsuarios.get("/", routes.checkAuthentication, routes.getMain);

routerUsuarios.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);

routerUsuarios.get("/login", routes.getLogin);

routerUsuarios.get("/register", routes.getRegister);

routerUsuarios.post(
  "/register",
  passport.authenticate("signup", { failureRedirect: "/failRegister" }),
  routes.postSignup
);

routerUsuarios.get("/failLogin", (req, res) => {
  res.render("failLogin");
});

routerUsuarios.get("/failRegister", (req, res) => {
  res.render("failRegister");
});

routerUsuarios.get("/showsession", (req, res) => {
  res.json(req.session);
});

routerUsuarios.get("/logout", routes.getLogout);

routerUsuarios.get("/info", routes.getInfo);

module.exports = routerUsuarios;
