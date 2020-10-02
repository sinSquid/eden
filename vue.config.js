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
        // target: 'http://121.40.184.231:3000/', // 远程服务器地址
        target: 'http://127.0.0.1:3038/', // 本地koa2服务，默认启动3000，防止冲突改为3038
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/customizeRemote/': '/',
        },
      },
    },
  },
};
