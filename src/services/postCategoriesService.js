const db = require('../database/models');

const postCategoriesService = {
  create: async (postId, categoryIds) => {
    const arrayInsert = categoryIds.map((categoryId) => ({ postId, categoryId }));
    const postCategories = await db.PostCategory.bulkCreate(arrayInsert);
    return postCategories;
  },
};                                      

module.exports = postCategoriesService;