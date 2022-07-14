const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const data = userService.validateBody(req.body);
    const token = await userService.create(data);
    res.status(201).json({ token });
  },

  list: async (req, res) => {
    jwtMiddleware.validateToken(req.headers.authorization);
    const users = await userService.list();
    res.status(200).json(users);
  },

  listById: async (req, res) => {
    jwtMiddleware.validateToken(req.headers.authorization);
    const { id } = userService.validateParamsId(req.params);
    const user = await userService.listById(id);
    res.status(200).json(user);
  },
};

module.exports = userController;