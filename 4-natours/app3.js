const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies (as sent)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 2) START SERVER
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
