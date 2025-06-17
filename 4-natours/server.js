// isn't express? so be my guest!
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB connection successfull"));
  
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}...`);
});
