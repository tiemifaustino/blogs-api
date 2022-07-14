const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const data = userService.validateBody(req.body);
    const token = await userService.create(data);
    res.status(201).json({ token });
  },
};

module.exports = userController;