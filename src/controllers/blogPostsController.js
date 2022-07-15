const jwtMiddleware = require('../middlewares/jwtMiddleware');
const blogPostsService = require('../services/blogPostsService');
const categoriesService = require('../services/categoriesService');
const postCategoriesService = require('../services/postCategoriesService');

const blogPostsController = {
  create: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const data = blogPostsService.validateBody(req.body);
    const categoryIds = await categoriesService.checkIfExists(data.categoryIds);
    const { dataValues } = await blogPostsService.create(id, data);
    await postCategoriesService.create(dataValues.id, categoryIds.rows);
    res.status(201).json(dataValues);
  },
};

module.exports = blogPostsController;