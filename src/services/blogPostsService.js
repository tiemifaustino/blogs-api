const Joi = require('joi');
const { runSchema } = require('../middlewares/validators');
const db = require('../database/models');

const blogPostsService = {
  validateBody: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1).required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  })),

  create: async (userId, { title, content }) => {
    const blogPost = await db.BlogPost.create({
      title,
      content,
      userId,
      updated: new Date(),
      published: new Date(),
    });
    return blogPost;
  },

  list: async (userId) => {
    const usersAndCategories = await db.BlogPost.findAll({
      where: { userId },
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return usersAndCategories;
  },
};                                      

module.exports = blogPostsService;