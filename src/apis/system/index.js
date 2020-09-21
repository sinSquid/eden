import qs from 'qs';
import axios from '@/lib/axios/checkStatus';

/**
 * @Description: 系统相关接口信息
 * @Author: sin
 * @date: 2020/9/21
 */

const prefix = 'customizeRemote'; // koa2服务器

// 登录权限验证
const signIn = (params) => axios.post(`/${prefix}/login`, qs.stringify(params));
// 获取用户菜单
const getUserMenu = (params) => axios.post(`/${prefix}/system/menu/getUserMenu`, qs.stringify(params));

export {
  signIn,
  getUserMenu,
};
