'use strict';

// 统一响应格式
module.exports = {
  /**
   * 成功响应
   * @param {Object} data 响应数据
   * @param {String} message 响应信息
   * @return {Object} 统一响应格式
   */
  resSuccess(data = null, message = '成功') {
    return {
      code: 200,
      message,
      data,
    };
  },

  /**
   * 错误响应
   * @param {Number} statusCode 错误码
   * @param {String} errorMsg 错误信息
   * @param {Object} errors 错误详情
   * @return {Object} 统一响应格式
   */
  resError({ statusCode = 500, errorMsg = '服务器错误', errors = null }) {
    const response = {
      code: statusCode,
      message: errorMsg,
    };
    if (errors) {
      response.errors = errors;
    }
    return response;
  },

  /**
   * 分页数据封装
   * @param {Array} list 数据列表
   * @param {Number} total 总数
   * @param {Number} page 当前页码
   * @param {Number} limit 每页数量
   * @return {Object} 分页数据
   */
  paginate({ list, total, page, limit }) {
    return {
      list,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};