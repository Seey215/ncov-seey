'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/v1/classes', controller.classes.getClassList);

  // 用户管理
  router.post('/api/v1/user', controller.user.create);
  router.post('/api/v1/user/login', controller.user.login);

  // 角色管理
  // 权限管理
};