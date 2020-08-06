import qs from 'qs';
// 全局api
import axios from '@/lib/axios/index';

export default {
  signIn: (data) => axios.post('/customizeRemote/login', qs.stringify(data)),
  signOut: () => axios.post(''),
};
