const Joi = require('joi');
const { runSchema } = require('./validators');
const db = require('../database/models');

const authService = {
  validateBody: runSchema(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  })),

  login: async (email, password) => {
    const user = await db.User.findOne({
      where: { email },
    });

    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },
};

module.exports = authService;