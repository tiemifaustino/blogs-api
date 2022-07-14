const jwtMiddleware = require('../middlewares/jwtMiddleware');
const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
    jwtMiddleware.validateToken(req.headers.authorization);
    const { name } = categoriesService.validateBody(req.body);
    const category = await categoriesService.create(name);
    res.status(201).json(category);
  },

  list: async (req, res) => {
    jwtMiddleware.validateToken(req.headers.authorization);
    const categories = await categoriesService.list();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;