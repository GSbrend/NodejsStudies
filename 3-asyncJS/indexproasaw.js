// Studying async/await with promises based on the previous code snippet
// named indexpro.js
const fs = require("fs");
const superagent = require("superagent");

const readFilePromisse = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject('file not found');
      resolve(data);
    });
  });
};

const writeFilePromisse = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) return reject('file not written');
      resolve("file written successfully");
    });
  });
};

// creating async function to handle the promises
// the async keyword allows us to use await inside the function
// save the result of readFilePromisse in a variable
// the await stops the execution of the function until the promise is resolved
// then the await will save the data returned by the promise
const getDogImage = async () => {
  try {
    // save the result of readFilePromisse in a variable
    // and log the breed of the dog from the file
    const data = await readFilePromisse(`${__dirname}/dogl.txt`);
    console.log(`Raça: ${data}`);
    // save the result of superagent.get in a variable
    // and log the random dog image URL
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    // waits for the writeFilePromisse promise to resolve
    //and writes the random dog image URL to a file named "dog-img.txt"
    await writeFilePromisse("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file");
    // if any of the promises fail, we catch the error and log it to the console
  } catch (err) {
    console.log(`something went wrong: ${err}`);
    throw err; 
  }
};
// calling the async function to execute the code
console.log("1: Will read file!");
getDogImage().then((asyncFunction) => {
  console.log(asyncFunction)
  console.log("3: Done getting dog image!");
}).catch((err) => {
  console.log('Deu ruim')
}
);
