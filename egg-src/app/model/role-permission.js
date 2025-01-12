'use strict';

module.exports = app => {
  const { model, Sequelize: { INTEGER, BIGINT } } = app;


  const RolePermission = model.define('RolePermission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      type: INTEGER,
      allowNull: false
    },
    permissionId: {
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
    tableName: 'tbl_role_permission',
    timestamps: false,
    underscored: true,
  });

  return RolePermission;
}; 