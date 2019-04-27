import axios from '@/lib/axios/index';

export default {
  signIn: data => axios.get('', data),
  signOut: () => axios.post(''),
};
