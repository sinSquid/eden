import qs from 'qs';
// 全局api
import axios from '@/lib/axios/index';

export default {
  signIn: data => axios.post('http://97.64.33.161:3000/login', qs.stringify(data)),
  signOut: () => axios.post(''),
};
