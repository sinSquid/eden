import axios from 'axios';
import store from '@/store/store';
import { getToken } from '@/lib/server/token';

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://192.168.0.37:8075', // api的base_url
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: false,
});

let onLoading = false; // 标记当前是否有请求
// request拦截器
instance.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  if (!config.isLoading) { // 当前无请求发起请求需要加载loading效果
    onLoading = true;
    store.commit('openLoading');
  }
  return config;
}, (error) => {
  if (onLoading) { // 请求错误时关闭loading加载
    onLoading = false;
    store.commit('closeLoading');
  }
  Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (onLoading) {
      onLoading = false;
      store.commit('closeLoading');
    }
    if (res.code !== 0) {
      this.$Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return res;
  },
  (error) => {
    if (onLoading) {
      onLoading = false;
      store.commit('closeLoading');
    }
    this.$Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default instance;
