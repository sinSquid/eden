import api from '@/store/api';
import router from '@/router';

const actions = {
  async signIn({ state, commit }, params) {
    const result = await api.signIn(params);
    const {
      status, code, data, token, message,
    } = result;
    if (status === 200 && code === 0) {
      commit('setUserInfo', data);
      const usertoken = { token };
      commit('setUserToken', usertoken);
      router.push({ path: '/home' });
    } else if (code === 1000) {
      const mess = { message, type: 'error' };
      commit('setGlobalMessage', mess);
    } else {
      commit('setGlobalMessage', state.netWorkError);
    }
  },
};
export default actions;
