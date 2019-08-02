import qs from 'qs';
// 全局api
import axios from '@/lib/axios/index';

export default {
  signIn: data => axios.post('/koa2/login', qs.stringify(data)),
  signOut: () => axios.post(''),
};
