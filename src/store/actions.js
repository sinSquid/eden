import api from '@/store/api';
import router from '@/router';
import { setUserToken } from '@/lib/store/cookie';
import proCall from '@/utils/standard/action-util';

const actions = {
  async signIn({ commit }, params) {
    const result = await api.signIn(params);
    const proResult = proCall(result);
    proResult.then(({
      code, data, token, message, timestamp,
    }) => {
      if (code === 0) {
        commit('setUserInfo', data);
        commit('setUserToken', { token });
        setUserToken(data.username, token);
        router.push({ path: '/' });
      } else {
        commit('setGlobalMessage', { message, type: 'error', timestamp });
      }
    }).catch(({ message, timestamp }) => {
      commit('setGlobalMessage', { message, type: 'error', timestamp });
    });
  },
};
export default actions;
