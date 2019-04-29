// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入人员列表
import existUser from '@/lib/config/existUser';
// token库
import { getToken, setToken } from '@/lib/server/token';

// 枚举
const userStatus = { // 0未登录，1登录，2隐匿
  quit: 0,
  online: 1,
  hidden: 2,
};

export default {
  name: 'moduleUserManage',
  namespaced: true,
  state: {
    userInfo: Object.assign({}, originUserInfo),
    existUser,
    userStatus,
    status: userStatus.quit,
    token: 'app_token',
  },
  getters: {
    userToken(state) {
      return getToken(state.token);
    },
  },
  actions: {
    signIn({ state, rootGetters, commit }, params) {
      return new Promise((resolve, reject) => {
        const username = params.username.trim();
        if (state.existUser.map(e => e.username).indexOf(username) !== -1) {
          const fund = state.existUser.filter(e => e.username === username);
          if (fund.length > 0 && fund[0].password === params.password) {
            commit('setUserInfo', fund[0]);
            commit('setUserToken', { token: rootGetters.currentTime });
            resolve();
          } else {
            reject(new Error('errorPassword'));
          }
        } else {
          reject(new Error('errorNotExist'));
        }
      });
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = Object.assign({}, payload);
    },
    setUserToken(state, payload) {
      setToken(state.token, payload.token);
    },
  },
};
