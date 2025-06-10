const fs = require('fs');
const spa = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Raça: ${data}`);

  spa
    .get(`https://dog.ceo/api/breed/${data}/image/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Imagem salva!");
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});
