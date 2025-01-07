module.exports = (appInfo) => {
  const config = (exports = {
    keys: appInfo.name + '_1715954266639_7366', // Cookie安全字符串
    middleware: ['robot'],
    // robot's configurations
    robot: {
      ua: [/curl/i, /Baiduspider/i],
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

    // view: {
    //   defaultViewEngine: "nunjucks",
    //   mapping: {
    //     ".html": "nunjucks",
    //   },
    // },

    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'hello',
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
