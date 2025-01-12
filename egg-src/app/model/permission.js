'use strict';

module.exports = app => {
  const { model, Sequelize: { STRING, INTEGER, BIGINT } } = app;

  const Permission = model.define('Permission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(30),
      allowNull: false,
      comment: '权限名称'
    },
    code: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      comment: '权限编码'
    },
    type: {
      type: INTEGER,
      allowNull: false,
      comment: '权限类型：menu:1 | button:2 | api:3'
    },
    parentId: {
      type: INTEGER,
      allowNull: true,
      comment: '父权限ID'
    },
    path: {
      type: STRING(100),
      comment: '权限路径'
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
    },
    deleteTime: {
      type: BIGINT,
      defaultValue: 0,
      comment: '删除时间'
    },
    status: {
      type: INTEGER,
      defaultValue: 0,
      comment: '状态, 0正常, 1禁用'
    }
  }, {
    tableName: 'tbl_permission',
    timestamps: false,
    defaultScope: {
      where: {
        deleteTime: 0
      }
    }
  });

  Permission.associate = function () {
    Permission.belongsToMany(model.Role, {
      through: 'tbl_role_permission',
      foreignKey: 'permission_id',
      otherKey: 'role_id'
    });
    // 自关联，用于树形结构
    Permission.hasMany(Permission, {
      as: 'children',
      foreignKey: 'parent_id'
    });
    Permission.belongsTo(Permission, {
      as: 'parent',
      foreignKey: 'parent_id'
    });
  };

  return Permission;
}; 