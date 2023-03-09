const service = require("../negocio/productos");
const usuarios = require("./usuarios");

async function postProductFilter(req, res) {
  const { buscadorProducto } = req.body;
  let resultado = await service.buscarProducto(buscadorProducto);
  if (resultado) {
    req.body.productosEncontrados = resultado;
    usuarios.getMain(req, res);
  } else {
    res.redirect("/");
  }
}

module.exports = {
  postProductFilter,
};
