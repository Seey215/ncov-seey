const { Service } = require('egg');

class ClassesService extends Service {

  /**
   * 获取班级列表
   * @param {Number} page - 页码
   * @param {Number} limit - 每页数量
   * @return {Promise<Object>} 班级列表数据
   */
  async getClassesList(page, limit) {
    const { ctx } = this;
    const offset = (page - 1) * limit;

    try {
      // TODO 学院id需联表查询出学院名
      const { rows, count } = await ctx.model.Classes.findAndCountAll({
        attributes: ['id', 'name', 'collegeId'],
        where: { deleteTime: 0 },
        raw: true,
        limit,
        offset,
      });

      return {
        list: rows,
        total: count,
      };
    } catch (error) {
      ctx.logger.error('[ClassesService] getClassesList error:', error);
      throw error;
    }
  }
}

module.exports = ClassesService;
