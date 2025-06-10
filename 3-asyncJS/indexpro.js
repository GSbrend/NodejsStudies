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
