import { signIn, getUserMenu } from '@/apis/system';
import router from '@/router';
import { setUserToken } from '@/lib/store/cookie';
import { store } from '@/lib/store/forage';

const actions = {
  signIn({ commit }, params) {
    signIn(params)
      .then(async ({
        code, data, token, message,
      }) => {
        if (code === 0) {
          const menuRes = await getUserMenu(data);
          if (!menuRes || (menuRes && menuRes.length === 0)) {
            commit('setGlobalMessage', { message: '此用户无菜单权限，请联系管理员', type: 'warning' });
            return;
          }
          commit('setMenusList', menuRes);
          commit('setUserInfo', data);
          setUserToken(token);
          const [{ children: [{ uri }] }] = menuRes; // 无子项的会过滤菜单项
          store.setItem(token, data)
            .then(() => {
              router.push({ path: uri });
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
