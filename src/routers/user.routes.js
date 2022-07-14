const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.post('/', userController.create);

module.exports = userRouter;