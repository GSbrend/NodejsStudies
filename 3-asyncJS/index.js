const fs = require("fs");
const { readFile } = require("fs/promises");
// Superagent is a library for making HTTP requests
// It is used to fetch data from APIs
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Raça: ${data}`);
});