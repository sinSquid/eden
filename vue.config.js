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
    port: 8001,
    proxy: {
      '/customizeRemote': {
        target: 'http://8.210.227.16:3000/', // koa2默认启动3000
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/customizeRemote/': '/',
        },
      },
    },
  },
};
