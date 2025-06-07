const fs = require('fs');

setTimeout(() => console.log('Time 1 is out!'), 0);
setImmediate(() => console.log('immediate 1 finished'));

fs.readFile('text-file.txt',()=> {
    console.log('I/O finished')
})

console.log('hello, top level code here!')