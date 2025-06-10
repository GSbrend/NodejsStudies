const fs = require("fs");
// Superagent is a library for making HTTP requests
// It is used to fetch data from APIs
const superagent = require("superagent");

// creating a promise to read a file
// "file" is the parameter that will be passed to the function
// example syntax: readFilePro("filename")
// when the function is called, it returns a new Promise
// inside the promise, we use fs.readFile to read the file
// fs.readFile takes two parameters: the file name and a callback function
// the callback function takes two parameters: err and data
// err is the error object, and data is the file content
// if there is an error reading the file, we reject the promise with an error message
// if the file is read successfully, we resolve the promise with the file content
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("file not found");
      resolve(data);
    });
  });
};

// creating a promise to write a file
// "file" is the file name, and "data" is the content to be written to the file
// example syntax: writeFilePro("filename", data)
// when the function is called, it returns a new Promise
// inside the promise, we use fs.writeFile to write the file
// fs.writeFile takes three parameters: the file name, the data to be written, and a callback function
// the callback function takes one parameter: err
// if there is an error writing the file, we reject the promise with an error message
// if the file is written successfully, we resolve the promise with a success message
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("file not written");
      resolve("file written successfully");
    });
  });
};

// when the script is run, it will read the file on the directory given
// it will then fetch a random dog image from the API based on the breed in the file
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Raça: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
// when the API call is successful, it will return a response
// the response will contain a message with the URL of the random dog image
// then we will write the URL to a file named "dog-img.txt"
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })
// After writing the file, we log a success message to the console
  .then(() => {
    console.log("Random dog image saved to file");
  })
// If any of the promises fail, we catch the error and log it to the console
  .catch((err) => {
    console.error(err.message);
  });
