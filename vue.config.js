// vue.config.js

function createProxyConfig() { // 代理，预留配置
  return {
    target: '',
    changeOrigin: true,
    ws: true,
  };
}

module.exports = {
  // 后续配置
  publicPath: '/takeaway/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': createProxyConfig(),
    },
  },
};
