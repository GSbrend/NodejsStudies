const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
//=========== HOW TO CHANGE THE THREADPOOLSIZE
//process.env.UV_THREADPOOL_SIZE = 4;
console.log('I/O finished');
//
setTimeout(() => console.log('Time 1 is out!'), 0);

fs.readFile('test-file.txt',() => {
    console.log('I/O finished');
    setTimeout(() => console.log('Time 2 is out!'), 0);
    setTimeout(() => console.log('Time 3 is out!'), 2000);
    setImmediate(() => console.log('immediate 1 finished'));

    process.nextTick(() => console.log('wtf'));
    
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, 'password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, 'password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, 'password encrypted');
    });
});

console.log('hello, top level code here!');