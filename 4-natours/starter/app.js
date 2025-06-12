const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

app.get('/api/v1/tours/:id?', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // Converte o id para número
  const tour = toursData.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  toursData.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (!req.params.id * 1 > toursData.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});
