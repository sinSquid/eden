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

// request拦截器
instance.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  (response) => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 1) {
      this.$Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        this.$MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            window.location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      const pro = Promise.reject('error');
      return pro;
    }
    return response.data;
  },
  (error) => {
    console.log(`err${error}`);// for debug
    this.$Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default instance;
