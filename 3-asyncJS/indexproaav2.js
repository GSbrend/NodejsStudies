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

const getDogImage = async () => {
  try {
    const data = await readFilePromisse(`${__dirname}/dogl.txt`);
    console.log(`Raça: ${data}`);
    const res1 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res = await Promise.all([res1, res2, res3]);
    const imgs = res.map(el => el.body.message);
    console.log(imgs);
    await writeFilePromisse("dog-img.txt", imgs.join('\n'));
    console.log("Random dog image saved to file");
    
  } catch (err) {
    console.log(`something went wrong: ${err}`);
    throw err; 
  }
};
console.log("1: Will read file!");
getDogImage().then((asyncFunction) => {
  console.log(asyncFunction)
  console.log("3: Done getting dog image!");
}).catch((err) => {
  console.log('Deu ruim')
}
);
