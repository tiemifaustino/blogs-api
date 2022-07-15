const Joi = require('joi');
const { runSchema } = require('../middlewares/validators');
const db = require('../database/models');

const blogPostsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().integer().positive().required(),
  })),
  
  validateBody: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1).required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  })),

  validateBodyUpdate: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  })),
  
  update: async (id, { title, content }) => {
    // a query UPDATE retorna zero quando não encontra o id (WHERE)
    // retorna como array, por isso a desestruturação
    const [updated] = await db.BlogPost.update(
      { title, content },
      { where: { id } },
    );

    if (!updated) {
      const error = new Error('Unauthorized user');
      error.name = 'UnauthorizedError';
      throw error;
    }
    return updated;
  },

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

  listById: async (postId, userId) => {
    const blogPost = await db.BlogPost.findByPk(postId, {
      where: { userId },
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
      attributes: { exclude: ['UserId'] },
    });

    if (!blogPost) {
      const error = new Error('Post does not exist');
      error.name = 'NotFoundError';
      throw error;
    }

    return blogPost;
  },
};                                      

module.exports = blogPostsService;