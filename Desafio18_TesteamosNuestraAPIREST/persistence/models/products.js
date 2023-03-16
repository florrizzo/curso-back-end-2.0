const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductsModel = model("products", ProductsSchema);
module.exports = { ProductsModel };
