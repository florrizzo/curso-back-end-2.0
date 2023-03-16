const service = require("../service/products");

async function getProducts(req, res) {
  let result = await service.getProducts();
  res.status(200).json(result);
}

async function getProductByName(req, res) {
  let { name } = req.params;
  let result = await service.getProductByName(name);
  res.status(200).json(result);
}

async function getProductById(req, res) {
  let { id } = req.params;
  let result = await service.getProductById(id);
  res.status(200).json(result);
}

async function postProduct(req, res) {
  let result = await service.postProduct(req.body.title, req.body.thumbnail, req.body.price);
  res.status(201).json(result);
}

async function putProductById(req, res) {
  let { id } = req.params;
  let result = await service.putProductById(id, req.body.title, req.body.thumbnail, req.body.price);
  res.status(201).json(result);
}

async function deleteProductById(req, res) {
  let { id } = req.params;
  let result = await service.deleteProductById(id);
  res.status(202).json(result);
}

module.exports = {
  getProducts,
  getProductByName,
  getProductById,
  postProduct,
  putProductById,
  deleteProductById,
};
