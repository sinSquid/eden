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
      '/api': {
        target: 'http://localhost:3000/', // koa2默认启动3000
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
