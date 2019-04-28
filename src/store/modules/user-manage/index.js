// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入人员列表
import existUser from '@/lib/config/existUser';

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
  },
  getters: {

  },
  actions: {
    signIn({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        const username = params.username.trim();
        console.log(state.existUser.map(e => e.username).indexOf(username) !== -1);
        if (state.existUser.map(e => e.username).indexOf(username) !== -1) {
          const fund = state.existUser.filter(e => e.username === username);
          console.log(fund.length > 0 && fund[0].password === params.password);
          if (fund.length > 0 && fund[0].password === params.password) {
            commit('setUserInfo', fund[0]);
            resolve();
          } else {
            reject(new Error());
            commit('setGlobalMessage', { message: '密码错误', type: 'error' }, { root: true });
          }
        } else {
          reject(new Error());
          commit('setGlobalMessage', { message: '账号不存在', type: 'error' }, { root: true });
        }
      });
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = Object.assign({}, payload);
    },
  },
};
