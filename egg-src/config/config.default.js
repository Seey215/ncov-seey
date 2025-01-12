module.exports = (appInfo) => {
  const config = (exports = {
    keys: appInfo.name + '_1715954266639_7366', // Cookie安全字符串

    jwt: {
      secret: appInfo.name + '_your-jwt-secret',
      enable: false,
      // match: /^\/api/, // 以 /api 开头的接口都需要验证 JWT
    },

    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    middleware: [
      'errorHandler',
    ],

    // 统一错误处理
    errorHandler: {
      // 中间件的配置项，可以为空
    },

    cluster: {
      listen: {
        port: 7002,
      },
    },

    security: {
      csrf: {
        enable: true,
        // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      },
    },

    validate: {
      // convert: true, // 对参数进行转换
      // validateRoot: true, // 限制被验证值必须是一个对象
      // widelyUndefined: true, // 将空字符串、NaN、null 转换为 undefined
    },

    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'egg_ncov',
      // 后续修改为挂载账密文件的方式访问账密
      username: 'root',
      password: 'mysql8is250!',
      define: {
        freezeTableName: true,
        timestamps: false,
      },
    },

  });

  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
