'use strict';

module.exports = app => {
  const { model, Sequelize: { STRING, INTEGER, BIGINT } } = app;

  const Role = model.define('Role', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      comment: '角色名称'
    },
    code: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      comment: '角色编码'
    },
    description: {
      type: STRING(100),
      comment: '角色描述'
    },
    create_time: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '创建时间'
    },
    update_time: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '更新时间'
    },
    delete_time: {
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
    tableName: 'tbl_role',
    timestamps: false,
    underscored: true, // 映射字段下划线命名
    defaultScope: {
      where: {
        delete_time: 0
      }
    }
  });

  Role.associate = function () {
    Role.belongsToMany(model.User, {
      through: 'tbl_user_role',
      foreignKey: 'role_id',
      otherKey: 'user_id'
    });

    Role.belongsToMany(model.Permission, {
      through: 'tbl_role_permission',
      foreignKey: 'role_id',
      otherKey: 'permission_id'
    });
  };

  return Role;
}; 