const Joi = require('joi');
const { runSchema } = require('../middlewares/validators');
const db = require('../database/models');

const categoriesService = {
  validateBody: runSchema(Joi.object({
    name: Joi.string().required().messages({
      'any.required': '"name" is required',
      'string.empty': '"name" is required',
    }),
  })),

  checkIfExists: async (arrayOfId) => {
    const checked = await db.Category.findAndCountAll({ // retorna um objeto (array) com 2 propriedades: "count" e "rows"
      where: { id: arrayOfId },
    });

    if (arrayOfId.length !== checked.count) {
      const error = new Error('"categoryIds" not found');
      error.name = 'ValidationError';
      throw error;
    }

    return checked;
  },

  create: async (name) => {
    const category = await db.Category.create({ name });
    return category;
  },

  list: async () => {
    const categories = await db.Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;