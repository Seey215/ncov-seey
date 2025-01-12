// app/controller/home.js

/**
 * @Controller home
 * @description 首页
 * @router get /
 */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;
