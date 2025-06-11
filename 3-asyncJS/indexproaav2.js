const fs = require("fs");
const { get } = require("http");
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

const getDogImage = async () => {
  try {
    const data = await readFilePromisse(`${__dirname}/dog.txt`);
    console.log(`Raça: ${data}`);
    const r1 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r2 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r3 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r4 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r5 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r6 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const r7 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res = await Promise.all([r1, r2, r3, r4, r5, r6, r7]);
    const imgs = res.map(el => el.body.message);
    console.log(imgs);
    await writeFilePromisse("dog-img.txt", imgs.join('\n'));

  } catch (err) {
    console.log(`something went wrong: ${err}`);
    throw err; 
  }
  return "2: Dog image fetched successfully!";
};
(async () => {
  console.log("1: Will read file!");
  console.log("waiting for the file to be read...");
  try {
    const i = await getDogImage();
    console.log(i);
    console.log("3: Done getting dog image!");
  } catch (err) {
    console.log('Deu ruim');
  }
})();
console.log('this line is not blocked by the async function');
