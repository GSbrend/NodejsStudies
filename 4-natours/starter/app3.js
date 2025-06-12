const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = 3000;
const version = 'v1';
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const reqTimeAt = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
}
// 1) MIDDLEWARES


app.use(morgan('dev')); // Log requests to the console

app.use(express.json()); // Parse JSON bodies (as sent by API clients)

app.use(reqTimeAt);

// 2) ROUTE HANDLERS

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

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

// 3) ROUTES

//makes the tourRouter only run in this especific url
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route('/')
  .get(getAllUsers)
  .patch(createUser);

userRouter.route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
