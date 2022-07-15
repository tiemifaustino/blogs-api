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

  list: async (idUser) => {
    // const users = await db.BlogPost.findAll({
    //   where: { id },
    //   include: [{ model: db.User, as: 'users' }],
    //   attributes: { exclude: ['password'] },
    // });

    const categories = await db.BlogPost.findAll({
      where: { id: 1, userId: idUser },
      include: [
        { model: db.User, as: 'users', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return categories;
  },
};                                      

module.exports = blogPostsService;