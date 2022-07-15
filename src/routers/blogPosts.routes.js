const { Router } = require('express');

const blogPostsRouter = Router();

const blogPostsController = require('../controllers/blogPostsController');

blogPostsRouter.get('/', blogPostsController.list);
blogPostsRouter.post('/', blogPostsController.create);
blogPostsRouter.get('/:id', blogPostsController.listById);

module.exports = blogPostsRouter;