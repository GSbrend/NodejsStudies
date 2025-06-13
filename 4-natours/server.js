// isn't express? so be my guest!

const app = require('./app');

console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}...`);
});
