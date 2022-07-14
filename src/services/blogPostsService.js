const Joi = require('joi');
const { runSchema } = require('../middlewares/validators');
// const db = require('../database/models');
// const jwtMiddleware = require('../middlewares/jwtMiddleware');

const blogPostsService = {
  validateBody: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
    'array.min': '"categoryIds" not found',
  })),

  create: async () => {
    //
  },
};                                             

module.exports = blogPostsService;