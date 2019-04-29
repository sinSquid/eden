// vue.config.js

function createProxyConfig() { // 代理，预留配置
  return {
    target: 'https://192.168.0.37:8075/',
    changeOrigin: true,
    ws: true,
  };
}

module.exports = {
  // 后续配置
  publicPath: '',
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
