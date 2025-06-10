const fs = require("fs");
// Superagent is a library for making HTTP requests
// It is used to fetch data from APIs
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Raça: ${data}`);
  // using superagent to fetch a random dog image from the API
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        // if there is an error, log the error message
        return console.error("Error fetching dog image:", err.message);
      }
      // writing the random dog image URL
      console.log(res.body.message);
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) {
          // if there is an error writing the file, log the error message
          return console.log("error writing file:", err.message);
        }
        // if the file is written successfully, log a success message
        console.log("Random dog image saved to file");
      });
    });
});