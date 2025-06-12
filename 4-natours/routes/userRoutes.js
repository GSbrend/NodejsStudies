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
  .get(userController.checkUserId,userController.getUserById)
  .patch(userController.checkUserId,userController.updateUser)
  .delete(userController.checkUserId,userController.deleteUser);

module.exports = router;
