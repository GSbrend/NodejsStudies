// Studying async/await with promises based on the previous code snippet
// named indexpro.js
const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("file not found");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`file not written: ${err.message}`);
      resolve("file written successfully");
    });
  });
};

// creating async function to handle the promises
// the async keyword allows us to use await inside the function
// save the result of readFilePro in a variable
// the await stops the execution of the function until the promise is resolved
// then the await will save the data returned by the promise
const getDogImage = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Raça: ${data}`);
    // save the result of superagent.get (which is a promise) in a variable
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    //
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file");
  } catch (err) {
    console.error(err.message);
  }
};
getDogImage();

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Raça: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    console.error(err.message);
  });
  */
