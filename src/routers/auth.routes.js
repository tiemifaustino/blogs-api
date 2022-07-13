const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

authRouter.post('/', authController.login);

module.exports = authRouter;