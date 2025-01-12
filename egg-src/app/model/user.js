'use strict';

module.exports = app => {
  const { model, Sequelize: { STRING, INTEGER, BIGINT } } = app;

  const User = model.define('User', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      comment: '用户名'
    },
    password: {
      type: STRING(100),
      allowNull: false,
      comment: '加密后的密码'
    },
    passwordSalt: {
      type: STRING(32),
      allowNull: false,
      comment: '密码加密盐值'
    },
    name: {
      type: STRING(30),
      allowNull: false,
      comment: '姓名'
    },
    email: {
      type: STRING(50),
      unique: true,
      allowNull: true,
      comment: '邮箱'
    },
    phone: {
      type: STRING(20),
      unique: true,
      allowNull: true,
      comment: '手机号'
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
    tableName: 'tbl_user',
    timestamps: false, // 不使用 Sequelize 默认的时间戳
    underscored: true, // 映射字段下划线命名
    defaultScope: {
      where: {
        delete_time: 0 // 默认查询未删除的记录
      }
    },
  });

  // 定义关联关系
  User.associate = function () {
    User.belongsToMany(model.Role, {
      through: 'tbl_user_role',
      foreignKey: 'user_id',
      otherKey: 'role_id'
    });
  };

  return User;
};
