import axios from '@/lib/axios/index';

export default {
  signIn: params => axios.get('', params),
  signOut: () => axios.post(''),
};
