const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.list);
userRouter.post('/', userController.create);

module.exports = userRouter;