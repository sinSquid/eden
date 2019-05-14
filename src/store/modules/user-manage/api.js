import qs from 'qs';
// 全局api
import axios from '@/lib/axios/index';


export default {
  signIn: data => axios.post('/login', qs.stringify(data)),
};
