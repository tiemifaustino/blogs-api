const { Router } = require('express');

const blogPostsRouter = Router();

const blogPostsController = require('../controllers/blogPostsController');

blogPostsRouter.get('/', blogPostsController.list);
blogPostsRouter.post('/', blogPostsController.create);

module.exports = blogPostsRouter;