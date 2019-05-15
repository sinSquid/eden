import api from '@/store/api';

const actions = {
  signIn({ commit }, params) {
    const info = api.signIn(params);
    commit('setUserInfo', info.data);
  },
};
export default actions;
