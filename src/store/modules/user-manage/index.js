// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入人员列表
import existUser from '@/lib/config/existUser';
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
  name: 'moduleUserManage',
  namespaced: true,
  state: {
    userInfo: Object.assign({}, originUserInfo),
    existUser,
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
      state.userInfo = Object.assign({}, payload);
    },
    setUserToken(state, payload) {
      setToken(state.token, payload.token);
    },
  },
};
