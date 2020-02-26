// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// token库
import { getToken, setToken } from '@/lib/server/token';
// 全局api
import api from './api';

// 枚举
const userStatus = { // 0未登录，1登录，2隐匿
  quit: 0,
  online: 1,
  hidden: 2,
};

export default {
  name: 'moduleUser',
  namespaced: true,
  state: {
    userInfo: { ...originUserInfo },
    userStatus,
    status: userStatus.quit,
    token: '',
  },
  getters: {
    userToken(state) {
      return getToken(state.token);
    },
  },
  actions: {
    signIn({ commit }, params) {
      const info = api.signIn(params);
      commit('setUserInfo', info.data);
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = { ...payload };
    },
    setUserToken(state, payload) {
      setToken(state.token, payload.token);
    },
  },
};
