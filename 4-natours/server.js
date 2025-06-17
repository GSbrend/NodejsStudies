// isn't express? so be my guest!
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

dotenv.config({ path: './config.env' });

mongoose.connect(DB, {
  useNewUrlParses: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con = {
  console.log(con.connections);
  console.log
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}...`);
});
