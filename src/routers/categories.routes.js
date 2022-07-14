const { Router } = require('express');

const categoriesRouter = Router();

const categoriesController = require('../controllers/categoriesController');

categoriesRouter.post('/', categoriesController.create);

module.exports = categoriesRouter;