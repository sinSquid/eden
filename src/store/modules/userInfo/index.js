// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入人员列表
import existStaff from '@/lib/config/existStaff';

export default {
  namespaced: true,
  state: {
    userInfo: Object.assign({}, originUserInfo),
    status: 0, // 0未登录， 1登录
    existStaff,
  },
  mutations: {
    setUserStatus(state, payload) {
      state.status = payload.status;
    },
  },
  actions: {

  },
};
