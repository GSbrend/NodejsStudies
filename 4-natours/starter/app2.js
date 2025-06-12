const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
// const version = 'v1';
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// middleware to analyze the request body of the incoming request
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello there from the middleware');
  next(); // Call next() to pass control to the next middleware or route handler
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length, //include the number of results
    data: {
      tours: toursData,
    },
  });
};

const getTourById = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (!req.params.id * 1 > toursData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

const deleteTour = (req, res) => {
  if (!req.params.id * 1 > toursData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//// unchained methods
//
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id?', getTourById);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
//
//// simplify the code by chaining the methods

// prettier-ignore
app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
  .route('/api/v1/tours:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);
