import api from '@/store/api';
import router from '@/router';
import { setUserToken } from '@/lib/store/cookie';
import proCall from '@/utils/xhr/procall';
import { store } from '@/lib/store/forage';

const actions = {
  async signIn({ commit }, params) {
    const result = await api.signIn(params);
    const proResult = proCall(result);
    proResult
      .then(({
        code, data, token, message,
      }) => {
        if (code === 0) {
          commit('setUserInfo', data);
          setUserToken(token);
          store.setItem(data.username, data)
            .then(() => {
              router.push({ path: '/' });
            });
        } else {
          commit('setGlobalMessage', { message, type: 'error' });
        }
      })
      .catch(({ message }) => {
        commit('setGlobalMessage', { message, type: 'error' });
      });
  },
};
export default actions;
