const Joi = require("joi");

const ProductsValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  thumbnail: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
});

/* const { error, value } = ProductsValidation.validate({ title: "abc", thumbnail: "abc", price: 1994 });
console.log(error);
console.log(value) */


module.exports = ProductsValidation;
