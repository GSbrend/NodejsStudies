const fs = require('fs');

console.log('I/O finished');
setTimeout(() => console.log('Time 1 is out!'), 0);

fs.readFile('test-file.txt',() => {
console.log('I/O finished');
setTimeout(() => console.log('Time 2 is out!'), 0);
setTimeout(() => console.log('Time 3 is out!'), 2000);
setImmediate(() => console.log('immediate 1 finished'));
});

console.log('hello, top level code here!');