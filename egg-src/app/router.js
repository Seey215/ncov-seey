// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/v1/news', controller.news.list);
};