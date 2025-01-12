const { Service } = require('egg');
const crypto = require('crypto');

class UserService extends Service {
  /**
   * 创建用户
   * @param {Object} userInfo - 用户信息
   * @return {Object} 创建的用户信息
   */
  async create(userInfo) {
    const { ctx } = this;
    const { username, password, name, email, phone } = userInfo;

    // 1. 检查用户名是否已存在
    const existUser = await ctx.model.User.findOne({
      where: { username },
      raw: true,
    });
    if (existUser) {
      ctx.throw(422, '用户名已存在');
    }

    // 2. 生成密码盐和加密密码
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    // 3. 创建用户
    const now = Date.now();
    await ctx.model.User.create({
      username,
      password: hashedPassword,
      passwordSalt: salt,
      name,
      email,
      phone,
      createTime: now,
      updateTime: now,
    });
  }

  /**
   * 验证用户密码
   * @param {Object} user - 用户对象
   * @param {String} password - 待验证的密码
   */
  async verifyPassword(user, password) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password + user.password_salt)
      .digest('hex');

    return hashedPassword === user.password;
  }

  /**
   * 用户登录
   * @param {Object} loginInfo - 登录信息
   * @return {Object} 登录结果
   */
  async login(loginInfo) {
    const { ctx, app } = this;
    const { username, password } = loginInfo;

    // 1. TODO 查找用户
    const user = await ctx.model.User.findOne({
      where: { username },
      include: [{
        model: ctx.model.Role,
        include: [{
          model: ctx.model.Permission
        }]
      }]
    });

    if (!user) {
      ctx.throw(422, '用户不存在');
    }

    // 2. 验证密码
    const hashedPassword = crypto
      .createHmac('sha256', user.password_salt)
      .update(password)
      .digest('hex');

    if (hashedPassword !== user.password) {
      ctx.throw(422, '密码错误');
    }

    // 3. 检查用户状态
    if (user.status !== 0) {
      ctx.throw(422, '用户已被禁用');
    }

    // 4. 生成 Token
    const token = app.jwt.sign({
      id: user.id,
      username: user.username,
    }, app.config.jwt.secret, {
      expiresIn: '24h',
    });

    // 5. 整理用户信息和权限
    const roles = user.Roles.map(role => role.code);
    const permissions = user.Roles.reduce((acc, role) => {
      const rolePermissions = role.Permissions.map(p => p.code);
      return [...acc, ...rolePermissions];
    }, []);

    // 6. 更新登录时间
    await user.update({
      update_time: Math.floor(Date.now() / 1000),
    });

    // 7. 返回登录结果
    const { password: _, password_salt: __, ...userInfo } = user.toJSON();
    return {
      token,
      userInfo: {
        ...userInfo,
        roles,
        permissions,
      },
    };
  }
}

module.exports = UserService;
