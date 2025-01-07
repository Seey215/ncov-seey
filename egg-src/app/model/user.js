'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('tb_user_auth', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), allowNull: false },
    pwdHash: { type: STRING(30), allowNull: false },
    pwdSalt: { type: STRING(30), allowNull: false },
    created_at: { type: BIGINT, allowNull: false },
    updated_at: { type: BIGINT, allowNull: false },
  }, {
    index: [{
      name: 'username',
      unique: true,
      fields: [ 'username' ],
    }],
  });

  return User;
};
