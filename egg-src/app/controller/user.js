/**
 * @Controller UserController
 * @description 用户管理
 */
'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  /**
   * 创建用户
   * 
   * @memberof UserController
   * @router POST /api/v1/user
   * @param {Object} request 请求
   * @param {object} request.body body参数
   * @param {string} request.body.username 用户名
   * @param {string} request.body.password 密码
   * @param {string} request.body.name 姓名
   * @param {string} request.body.email 电子邮箱
   * @param {string} request.body.phone 电话号码
   * @param {string} request.body._csrf csrfToken
   * 
   * @return {object} response 响应体
   * @param {object} response 响应体
   * @param {number} response.code 状态码
   * @param {string} response.message 状态信息
   * @param {object} response.data 数据
   * @example
   * {
   *   "code": 200,
   *   "message": "成功",
   *   "data": null
   * }
   */
  async create() {
    const { ctx } = this;

    ctx.validate({
      username: { type: 'string', required: true, min: 2, max: 30 },
      password: { type: 'string', required: true, min: 6, max: 20 },
      name: { type: 'string', required: true, min: 2, max: 30 },
      email: { type: 'email', required: false },
      phone: { type: 'string', required: false, max: 20 },
    });

    await ctx.service.user.create(ctx.request.body);
    ctx.body = ctx.helper.resSuccess();
  }

  /**
   * 用户登录
   * 
   * @memberof UserController
   * @router POST /api/v1/user/login
   * @param {Object} request 请求
   * @param {object} request.body body参数
   * @param {string} request.body.username 用户名
   * @param {string} request.body.password 密码
   * @param {string} request.body._csrf csrfToken
   * 
   * @return {object} response 响应体
   * @param {object} response 响应体
   * @param {number} response.code 状态码
   * @param {string} response.message 状态信息
   * @param {object} response.data 数据
   * @example
   * {
   *   "code": 200,
   *   "message": "登录成功",
   *   "data": {
   *     "token": "xxx",
   *     "userInfo": {
   *       "id": 1,
   *       "username": "admin",
   *       "name": "管理员"
   *     }
   *   }
   * }
   */
  async login() {
    const { ctx } = this;

    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });

    const data = await ctx.service.user.login(ctx.request.body);

    // 设置 session, 后续改为Redis存储sessionId
    ctx.session.userId = data.userInfo.id;
    ctx.body = ctx.helper.resSuccess(data);
  }
}

module.exports = UserController; 