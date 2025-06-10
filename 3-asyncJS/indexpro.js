const fs = require("fs");
// Superagent is a library for making HTTP requests
// It is used to fetch data from APIs
const superagent = require("superagent");

// creating a promise to read a file
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("file not found");
      resolve(data);
    });
  });
};

// creating a promise to write a file
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("file not written");
      resolve("file written successfully");
    });
  });
};

// Using the readFilePro function to read the dog.txt file
// syntax: readFilePro("filename")
readFilePro(`${__dirname}/dog.txt`)
  // Using the readFile function from fs/promises to read the file
  .then((data) => {
    console.log(`Raça: ${data}`);
    // Using superagent to fetch a random dog image from the API
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  // if successful, the response will contain the random dog image URL
  .then((res) => {
    // showing the random dog image URL
    // res.body.message contains the URL of the random dog image
    console.log(res.body.message);
    // Using the writeFilePro function to write the random dog image URL to a file
    // Writing the random dog image URL to a file named dog-img.txt
    // syntax: writeFilePro("filename", data)
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    console.error(err.message);
  });
