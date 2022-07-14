const Joi = require('joi');
const { runSchema } = require('./validators');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: runSchema(Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().min(6).messages({
      'array.min': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  })),

  login: async (email, userPassword) => {
    const user = await db.User.findOne({
      where: { email, password: userPassword },
      attributes: { exclude: ['displayName', 'image'] },
    });

    if (!user || user.password !== userPassword) {
      const error = new Error('Invalid fields');
      error.name = 'ValidationError';
      throw error;
    }

    const { password, ...userWithoutPassword } = user.dataValues;
    const token = jwtService.createToken(userWithoutPassword);
    return token;
  },
};

module.exports = authService;