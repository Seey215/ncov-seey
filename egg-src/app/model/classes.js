'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  // Class易于关键字混淆，改用BanJi
  const BanJi = app.model.define('BanJi', {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(255),
      allowNull: false,
      comment: '班级名称',
    },
    collegeId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '所属学院id',
    },
    updateTime: {
      type: BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '更新时间戳',
    },
    deleteTime: {
      type: BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '删除时间戳',
    },
  }, {
    tableName: 'tbl_class',
    timestamps: false,
    underscored: true, // 映射字段下划线命名
    // indexes: [
    //   {
    //     name: 'name',
    //     unique: true,
    //     fields: ['name'],
    //   },
    // ],
  });

  // BanJi.associate = function () {
  //   app.model.BanJi.hasMany(app.model.Student, {
  //     foreignKey: 'classId',
  //     targetKey: 'id'
  //   });
  // };

  return BanJi;
};
