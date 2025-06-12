const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`user ID is: ${val}`);
  next();
});

router
  .route('/')
  .get(userController.getAllUsers)
  .patch(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
