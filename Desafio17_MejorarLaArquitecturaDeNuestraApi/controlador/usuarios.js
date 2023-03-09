const service = require("../negocio/usuarios");

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

function postLogin(req, res) {
  const { username, password } = req.user;
  res.redirect("/usuarios");
}

function getLogin(req, res) {
  res.render("login");
}

function getRegister(req, res) {
  res.render("register");
}

function postSignup(req, res) {
  const { username, password, nombre } = req.user;
  service.signUpMail(username);
  res.redirect("/usuarios");
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

module.exports = {
  checkAuthentication,
  postSignup,
  getLogin,
  getRegister,
  postLogin,
  getMain,
  getLogout,
  getInfo,
};
