const Joi = require('joi');
const { runSchema } = require('../middlewares/validators');
const db = require('../database/models');
const authService = require('./authService');

const userService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8).messages({
      'array.min': '"displayName" length must be at least 8 characters long',
      'string.empty': 'Some required fields are missing',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
      'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().min(6).messages({
      'array.min': '"password" length must be at least 6 characters long',
      'string.empty': 'Some required fields are missing',
    }),
    image: Joi.string().required(),
  })),

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().integer().positive().required(),
  })),

  create: async ({ displayName, email, password, image }) => {
    const checkUser = await db.User.findOne({
      where: { email },
    });

    if (checkUser) {
      const error = new Error('User already registered');
      error.name = 'ConflictError';
      throw error;
    }

    await db.User.create({
      displayName,
      email,
      password,
      image,
    });

    const token = await authService.login(email, password);
    return token;
  },

  list: async () => {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  listById: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      const error = new Error('User does not exist');
      error.name = 'NotFoundError';
      throw error;
    }
    return user;
  },
};

module.exports = userService;