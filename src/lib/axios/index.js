import axios from 'axios';
import store from '@/store/store';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/', // api的base_url
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: false,
});

let loading = false; // 标记当前是否有loading请求
// request拦截器
instance.interceptors.request.use((config) => {
  console.log(config);
  if (config.loading) { // 当前无请求发起请求需要加载loading效果
    loading = true;
    store.commit('setGlobalLoading', { loading: true });
  }
  return config;
}, (error) => {
  if (loading) { // 请求错误时关闭loading加载
    loading = false;
    store.commit('setGlobalLoading', { loading: false });
  }
  return Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  (response) => {
    if (loading) {
      loading = false;
      store.commit('setGlobalLoading', { loading: false });
    }
    return response;
  },
  (error) => {
    if (loading) {
      loading = false;
      store.commit('setGlobalLoading', { loading: false });
    }
    return Promise.reject(error);
  },
);

export default instance;
