const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.param('id', userController.checkUserId);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
