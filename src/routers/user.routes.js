const { Router } = require('express');

const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.post('/', userController.create);
userRouter.get('/', userController.list);
userRouter.get('/:id', userController.listById);
userRouter.delete('/me', userController.delete);

module.exports = userRouter;