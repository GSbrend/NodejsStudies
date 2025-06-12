const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length, // É uma boa prática incluir o número de resultados
    data: {
      tours: toursData,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    // results: toursData.length, // É uma boa prática incluir o número de resultados
    // data: {
    //   tours: toursData,
    // },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // // phase 1
  // console.log(req.body);
  // res.send('done');

  // phase 2
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  toursData.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursData), (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        },
      });
    }
  );
});