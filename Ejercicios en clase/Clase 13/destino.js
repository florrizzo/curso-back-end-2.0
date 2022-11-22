"use strict";

var generarNumero = function generarNumero(num) {
  return (Math.random() * num).toFixed(0);
};
var colorRGB = function colorRGB() {
  var color = "(".concat(generarNumero(255), ",").concat(generarNumero(255), ",").concat(generarNumero(255), ")");
  return "RGB".concat(color);
};
console.log(colorRGB());
console.log(colorRGB());
