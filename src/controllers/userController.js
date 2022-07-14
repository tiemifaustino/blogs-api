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
};

module.exports = userController;