const fs = require("fs");
const superagent = require("superagent");
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Raça: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/image/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-image.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Imagem salva!");
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});
