const jwtMiddleware = require('../middlewares/jwtMiddleware');
const blogPostsService = require('../services/blogPostsService');

const blogPostsController = {
  create: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const data = blogPostsService.validateBody(req.body);
    const blogPost = await blogPostsService.create(id, data);
    res.status(201).json(blogPost);
  },
};

module.exports = blogPostsController;