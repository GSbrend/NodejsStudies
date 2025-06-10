//           HOW STREAMS WORK - TOP LVL CODE HERE
const fs = require('fs');
// Ao invés de criar uma variavel http para depois
// criar a variável server, criamos ela junto com o
// require
const server = require('http').createServer();
// reding a huge file to send back to the user
// =========== BASIC WAY ===============
server.on('request', (req, res) => {
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log('Oops! Something went wrong! 🤔');
        res.end(data);
    });
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000...');
});