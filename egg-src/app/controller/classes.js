/**
 * @Controller ClassesController
 * @description 班级管理
 */
'use strict';

const Controller = require('egg').Controller;

/**
 * 班级控制器类
 * @class ClassesController
 * @extends Controller
 */
class ClassesController extends Controller {
  /**
   * 获取班级列表
   * 
   * @memberof ClassesController
   * @router GET /api/v1/classes
   * @param {Object} request 请求
   * @param {object} request.query query参数
   * @param {number} [request.query.page=1] 页码 -- [1, 100]
   * @param {number} [request.query.limit=10] 每页数量 -- [10, 500]
   * 
   * @return {object} response 响应体
   * @param {object} response 响应体
   * @param {number} response.code 状态码
   * @param {string} response.message 状态信息
   * @param {object} response.data 数据
   * @param {number} response.data.total 总数量
   * @param {array} response.data.list 班级列表
   * @param {number} response.data.list.id 班级id
   * @param {string} response.data.list.name 班级名称
   * @param {number} response.data.list.collegeId 所属学院id
   * @param {number} response.data.list.updateTime 更新时间戳
   * @param {number} response.data.list.deleteTime 删除时间戳
   * @example
   * {
   *   code: 200,
   *   message: '成功',
   *   data: {
   *     total: 10,
   *     list: [
   *       {
   *         id: 1,
   *         name: '一班',
   *         collegeId: 1,
   *         updateTime: 1591139200000,
   *         deleteTime: 0,
   *       }
   *     ]
   *   }
   * }
   */
  async getClassList() {
    const { ctx } = this;
    const { query } = ctx.request;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    ctx.validate({
      page: { type: 'int', required: true, min: 1, max: 100 },
      limit: { type: 'int', required: true, min: 1, max: 500 },
    }, { page, limit });

    const { list, total } = await ctx.service.classes.getClassesList(page, limit);
    const paginatedData = ctx.helper.paginate({ list, total, page, limit });
    ctx.body = ctx.helper.resSuccess(paginatedData);
  }
}

module.exports = ClassesController;
