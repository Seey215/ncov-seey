'use strict';

module.exports = (app) => {

  const { model, Sequelize: { INTEGER, BIGINT } } = app;

  const UserRole = model.define('UserRole', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER,
      allowNull: false
    },
    roleId: {
      type: INTEGER,
      allowNull: false
    },
    createTime: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '创建时间'
    },
    updateTime: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '更新时间'
    }
  }, {
    tableName: 'tbl_user_role',
    timestamps: false,
    underscored: true,
  });

  return UserRole;
}; 