//           HOW STREAMS WORK - TOP LVL CODE HERE
const fs = require('fs');
// Ao invés de criar uma variavel http para depois
// criar a variável server, criamos ela junto com o
// require
const server = require('http').createServer();
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000...');
});
// reding a huge file to send back to the user

server.on('request', (req, res) => {
// // =========== Solution 1 - WITHOUT STREAM ===============
// // 
// // works jsut fine, but it loads the whole file into
// // memory, 'cuz only after its ready, it can then send

//     fs.readFile('test-file.txt', (err, data) => {
//         if (err) console.log('Oops! Something went wrong! 🤔');
//         res.end(data);
//     });

// // =========== Solution 2 - USING STREAM =================
// // 
// // We don't need to save the data into a variable
// // creating a readable stream, and when we recieve the
// // chunks of data, we'll send back to the client as a 
// // writable stream

// // step1: Create a variable to save the readable stream
//     const readable = fs.createReadStream('test-file.txt');
// // step2: listen to the readable stream and callback the
// // chunk that was read
//     readable.on('data', chunk => {
//         res.write(chunk);
//     });
// // when the file is completely read
//     readable.on('end', () => {
//         res.end();
//     });
// // when something goes wrong
//     readable.on('error', err => {
//         console.log(err);
//         res.statusCode = 500;
//         res.end('file not found!');
//     });
// // PROBLEM: the radable stream is way much faster then
// // the res.write(...), on the network, which overwhelm
// // the response stream, which cannot handle all this 
// // incoming data so fast; We call that "Backpressure"

// // =========== Solution 3 - USING STREAM =================
// // avoiding the problem in solution 2

//     const readable = fs.createReadStream('test-file.txt');
//     readable.pipe(res);
});

