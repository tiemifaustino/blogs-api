const { Router } = require('express');

const blogPostsRouter = Router();

const blogPostsController = require('../controllers/blogPostsController');

blogPostsRouter.get('/', blogPostsController.list);
blogPostsRouter.get('/:id', blogPostsController.listById);
blogPostsRouter.post('/', blogPostsController.create);
blogPostsRouter.put('/:id', blogPostsController.update);
blogPostsRouter.delete('/:id', blogPostsController.delete);

module.exports = blogPostsRouter;