"use strict";
var numberGenerator = function (num) {
    return (Math.random() * num).toFixed(0);
};
var RGB = function () {
    var color = "(".concat(numberGenerator(255), ",").concat(numberGenerator(255), ",").concat(numberGenerator(255), ")");
    return "RGB".concat(color);
};
console.log(RGB());
console.log(RGB());
