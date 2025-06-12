const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const reqTimeAt = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
}
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// 1) MIDDLEWARES


app.use(morgan('dev')); // Log requests to the console

app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(reqTimeAt);

//makes the tourRouter only run in this especific url
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
