const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) GLOBAL MIDDLEWARES
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies (as sent)

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 3) START SERVER
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
