'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BIGINT } = Sequelize;

    // 用户表
    await queryInterface.createTable('tbl_user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), unique: true, allowNull: false, comment: '用户名' },
      password: { type: STRING(100), allowNull: false, comment: '加密后的密码' },
      password_salt: { type: STRING(32), allowNull: false, comment: '密码加密盐值' },
      name: { type: STRING(30), allowNull: false, comment: '姓名' },
      email: { type: STRING(50), unique: true, allowNull: true, comment: '邮箱' },
      phone: { type: STRING(20), unique: true, allowNull: true, comment: '手机号' },
      create_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '创建时间' },
      update_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '更新时间' },
      delete_time: { type: BIGINT, defaultValue: 0, comment: '删除时间' },
      status: { type: INTEGER, defaultValue: 0, comment: '状态, 0正常, 1禁用' },
    });

    // 用户表索引 where deleteTime = 0
    await queryInterface.addIndex('tbl_user', ['delete_time', 'status'], {
      name: 'idx_users_query' // 用于列表查询的组合索引
    });
    await queryInterface.addIndex('tbl_user', ['delete_time', 'username'], {
      name: 'idx_users_username' // 用于用户名查询
    });
    await queryInterface.addIndex('tbl_user', ['delete_time', 'email'], {
      name: 'idx_users_email',
      unique: true,
      where: { delete_time: 0 } // 部分索引，只对未删除的记录建立唯一索引
    });
    await queryInterface.addIndex('tbl_user', ['delete_time', 'phone'], {
      name: 'idx_users_phone',
      unique: true,
      where: { delete_time: 0 }
    });

    // 角色表
    await queryInterface.createTable('tbl_role', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), unique: true, allowNull: false, comment: '角色名称' },
      code: { type: STRING(30), unique: true, allowNull: false, comment: '角色编码' },
      description: { type: STRING(100), comment: '角色描述' },
      create_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '创建时间' },
      update_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '更新时间' },
      delete_time: { type: BIGINT, defaultValue: 0, comment: '删除时间' },
      status: { type: INTEGER, defaultValue: 0, comment: '状态, 0正常, 1禁用' },
    });

    // 角色表索引
    await queryInterface.addIndex('tbl_role', ['delete_time', 'status'], {
      name: 'idx_roles_query'
    });
    await queryInterface.addIndex('tbl_role', ['code', 'delete_time'], {
      name: 'idx_roles_code',
      unique: true,
      where: { delete_time: 0 }
    });

    // 权限表
    await queryInterface.createTable('tbl_permission', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false, comment: '权限名称' },
      code: { type: STRING(30), unique: true, allowNull: false, comment: '权限编码' },
      type: { type: INTEGER, allowNull: false, comment: '权限类型：menu:1 | button:2 | api:3' },
      parent_id: { type: INTEGER, allowNull: true, comment: '父权限ID' },
      path: { type: STRING(100), comment: '权限路径' },
      create_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '创建时间' },
      update_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '更新时间' },
      delete_time: { type: BIGINT, defaultValue: 0, comment: '删除时间' },
      status: { type: INTEGER, defaultValue: 0, comment: '状态, 0正常, 1禁用' },
    });

    // 权限表索引
    await queryInterface.addIndex('tbl_permission', ['delete_time', 'status', 'type'], {
      name: 'idx_permissions_query' // 支持按类型查询权限列表
    });
    await queryInterface.addIndex('tbl_permission', ['code', 'delete_time'], {
      name: 'idx_permissions_code',
      unique: true,
      where: { delete_time: 0 }
    });
    await queryInterface.addIndex('tbl_permission', ['parent_id', 'delete_time'], {
      name: 'idx_permissions_parent' // 支持树形结构查询
    });

    // 用户-角色关联表
    await queryInterface.createTable('tbl_user_role', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: INTEGER, allowNull: false, references: { model: 'tbl_user', key: 'id' } },
      role_id: { type: INTEGER, allowNull: false, references: { model: 'tbl_role', key: 'id' } },
      create_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '创建时间' },
      update_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '更新时间' },
    });

    // 用户-角色关联表索引
    await queryInterface.addIndex('tbl_user_role', ['user_id', 'role_id'], {
      name: 'uk_user_roles',
      unique: true // 确保用户-角色关系唯一
    });
    await queryInterface.addIndex('tbl_user_role', ['role_id'], {
      name: 'idx_user_roles_role' // 支持按角色查询用户
    });

    // 角色-权限关联表
    await queryInterface.createTable('tbl_role_permission', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role_id: { type: INTEGER, allowNull: false, references: { model: 'tbl_role', key: 'id' } },
      permission_id: { type: INTEGER, allowNull: false, references: { model: 'tbl_permission', key: 'id' } },
      create_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '创建时间' },
      update_time: { type: BIGINT, allowNull: false, defaultValue: 0, comment: '更新时间' },
    });

    // 角色-权限关联表索引
    await queryInterface.addIndex('tbl_role_permission', ['role_id', 'permission_id'], {
      name: 'uk_role_permissions',
      unique: true // 确保角色-权限关系唯一
    });
    await queryInterface.addIndex('tbl_role_permission', ['permission_id'], {
      name: 'idx_role_permissions_permission' // 支持按权限查询角色
    });

    // 创建索引
    // await queryInterface.addIndex('users', ['username']);
    // await queryInterface.addIndex('users', ['email']);
    // await queryInterface.addIndex('users', ['phone']);
    // await queryInterface.addIndex('roles', ['code']);
    // await queryInterface.addIndex('permissions', ['code']);
    // await queryInterface.addIndex('permissions', ['parent_id']);
    // await queryInterface.addIndex('user_roles', ['user_id', 'role_id'], { unique: true });
    // await queryInterface.addIndex('role_permissions', ['role_id', 'permission_id'], { unique: true });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('tbl_role_permission');
    await queryInterface.dropTable('tbl_user_role');
    await queryInterface.dropTable('tbl_permission');
    await queryInterface.dropTable('tbl_role');
    await queryInterface.dropTable('tbl_user');
  }
}; 