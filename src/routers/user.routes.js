const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.list);
userRouter.get('/:id', userController.listById);
userRouter.post('/', userController.create);
userRouter.delete('/me', userController.delete);

module.exports = userRouter;