// console.log(arguments);
// console.log(require('module').wrapper);

//  export/import data from one module into the other
// using module.exports
const C = require("./testmodule1");
const calc1 = new C();
console.log(calc1.add(5, 12));

// using export
// saving into a variable
// const calc2 = require("./testmodule2");
// console.log(calc2.multiply(5, 12));
// using destructuring
const { add, devide, multiply } = require("./testmodule2");
console.log(add(5, 12));
console.log(devide(5, 12));
console.log(multiply(5, 12));
