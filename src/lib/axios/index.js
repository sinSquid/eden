import axios from 'axios';
import store from '@/store/store';
import { getToken } from '@/lib/server/token';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/', // api的base_url
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: false,
});

let onLoading = false; // 标记当前是否有请求
// request拦截器
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.isLoading) { // 当前无请求发起请求需要加载loading效果
    onLoading = true;
    store.commit('openLoading');
  }
  return config;
}, (error) => {
  if (onLoading) { // 请求错误时关闭loading加载
    onLoading = false;
    store.commit('closeLoading');
  }
  return Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  (response) => {
    if (onLoading) {
      onLoading = false;
      store.commit('closeLoading');
    }
    return response;
  },
  (error) => {
    if (onLoading) {
      onLoading = false;
      store.commit('closeLoading');
    }
    return Promise.reject(error);
  },
);

export default instance;
