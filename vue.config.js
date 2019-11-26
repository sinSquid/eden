// vue.config.js

module.exports = {
  // 后续配置
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/koa2': {
        target: 'http://97.64.33.74:3000/', // koa2默认启动3000
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/koa2': '',
        },
      },
    },
  },
};
