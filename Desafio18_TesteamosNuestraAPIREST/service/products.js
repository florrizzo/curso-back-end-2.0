const DAO = require("../persistence/data");
const ProductsDao = DAO[0];
const container = ProductsDao.getInstance();
const logger = require("../config/logger");
const ProductsValidation = require("../config/validation");

async function validateId(id) {
  let result = await container.getById(id);
  if (!result) {
    return "No se encontró ningún producto";
  }
  return result;
}

async function getProducts() {
  let resultado = await container.getAll();
  return resultado;
}

async function getProductByName(name) {
  let result = await container.getByName(name);
  if (!result) {
    return "No se encontró ningún producto";
  }
  return result;
}

async function getProductById(id) {
  return validateId(id);
}

async function postProduct(title, thumbnail, price) {
  const { error, value } = await ProductsValidation.validate({
    title: title,
    thumbnail: thumbnail,
    price: price,
  });
  if (error) {
    logger.log("info", "Error de posteo: " + error);
    return "No se pudo postear el producto";
  }
  let result = await container.save(title, thumbnail, price);
  return result;
}

async function putProductById(id, title, thumbnail, price) {
  return validateId(id);
  const { error, value } = await ProductsValidation.validate({
    title: title,
    thumbnail: thumbnail,
    price: price,
  });
  if (error) {
    logger.log("info", "Error de posteo: " + error);
    return "No se pudo postear el producto";
  } else {
    let result = await container.replace(id, title, thumbnail, price);
    return result;
  }
}

async function deleteProductById(id) {
  return validateId(id);
  let result = await container.getById(id);
  if (!result) {
    return "No se encontró ningún producto";
  } else {
    let result = await container.deleteById(id);
    return result;
  }
}

module.exports = {
  getProducts,
  getProductByName,
  getProductById,
  postProduct,
  putProductById,
  deleteProductById,
};
