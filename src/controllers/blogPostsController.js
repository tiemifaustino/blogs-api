const jwtMiddleware = require('../middlewares/jwtMiddleware');
const blogPostsService = require('../services/blogPostsService');
const categoriesService = require('../services/categoriesService');
const postCategoriesService = require('../services/postCategoriesService');

const blogPostsController = {
  create: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const data = blogPostsService.validateBody(req.body);
    const categoryIds = await categoriesService.checkIfExists(data.categoryIds);
    const { dataValues } = await blogPostsService.create(id, data);
    await postCategoriesService.create(dataValues.id, categoryIds.rows);
    res.status(201).json(dataValues);
  },

  list: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const blogPosts = await blogPostsService.list(id);
    res.status(200).json(blogPosts);
  },

  listById: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const postId = blogPostsService.validateParamsId(req.params);
    const blogPost = await blogPostsService.listById(postId.id, id);
    res.status(200).json(blogPost);
  },

  update: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization); // valida token
    const postId = blogPostsService.validateParamsId(req.params); // valida id do post
    const postToBeUpdated = blogPostsService.validateBodyUpdate(req.body); // valida body da req
    await blogPostsService.update(postId.id, postToBeUpdated); // faz o update e verifica se id existe
    const updated = await blogPostsService.listById(postId.id, id); // seleciona o post atualizado
    res.status(200).json(updated);
  },

  delete: async (req, res) => {
    const { data: { id } } = jwtMiddleware.validateToken(req.headers.authorization);
    const postId = blogPostsService.validateParamsId(req.params);
    await blogPostsService.delete(postId.id, id);
    res.sendStatus(204);
  },

  search: async (req, res) => {
    console.log('estou no Controller');
    jwtMiddleware.validateToken(req.headers.authorization);
    const { q } = req.query;
    const found = await blogPostsService.search(q);
    res.status(200).json(found);
  },
};

module.exports = blogPostsController;