const jwtMiddleware = require('../middlewares/jwtMiddleware');
const blogPostsService = require('../services/blogPostsService');

const blogPostsController = {
  create: async (req, res) => {
    jwtMiddleware.validateToken(req.headers.authorization);
    // const data = req.body;
    const post = await blogPostsService.create();
    res.status(201).json(post);
  },
};

module.exports = blogPostsController;