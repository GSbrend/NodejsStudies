const EventEmitter = require('events');
const http = require('http');

//a nova classe VENDAS (parent class) herdará tudo da classe EVENTEMITTER (superclass)
class Vendas extends EventEmitter {
//função que dispara toda vez que criamos um novo objeto da classe
    constructor(){
//usamos o super() para pegar todos os métodos da classe super
        super();
    }
}
const myEmitter = new Vendas();

//
myEmitter.on('novaVenda', () => {
    console.log('Uma nova venda chegou!')
})

myEmitter.on('novaVenda', () => {
    console.log('Nome do cliente: Brendon.')
})

myEmitter.on('novaVenda', stock => {
    console.log(`Temos, no momento, ${stock} itens no estoque`)
})

myEmitter.emit('novaVenda', 3);

/////////////////////////////////////////////////////////////////////////
//criando um mini web-server
const server = http.createServer();

//escutar eventos do servidor
server.on('request', (req, res) => {
    console.log('Recebi uma nova solicitação!')
    res.end('Recebi uma solicitação!');
});

server.on('request', (req, res) => {
    res.end('Outra solicitação');
});

server.on('close', () => {
    console.log('Servidor fechado')
});

server.listen(8000, '127.0.01', () => {
    console.log('Esperando solicitações...')
})