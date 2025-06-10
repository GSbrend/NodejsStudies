// console.log(arguments);
// console.log(require('module').wrapper);

//  export/import data from one module into the other
const C = require('./testmodule1')

const calc1 = new C();
console.log(calc1.add(5,12));
