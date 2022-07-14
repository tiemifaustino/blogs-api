const { Router } = require('express');

const blogPostsRouter = Router();

const blogPostsController = require('../controllers/blogPostsController');

blogPostsRouter.post('/', blogPostsController.create);

module.exports = blogPostsRouter;