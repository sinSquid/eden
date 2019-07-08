import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入elementUI配置文件
import { elMessageOptions, elLoadingOptions } from '@/lib/element/config';

// 登录状态枚举
const userStatus = { // 0未登录，1登录，2隐匿
  quit: 0,
  online: 1,
  hidden: 2,
};
const vuexKey = 'vuexResetForage';

const netWorkError = { message: '网络错误,请稍后再试', type: 'error' };
const config = {
  key: vuexKey,
  storage: window.sessionStorage,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalMessage: Object.assign({}, elMessageOptions), // 全局通知，基于elementUI的message
    userInfo: Object.assign({}, originUserInfo),
    userStatus,
    netWorkError,
    globalLoading: Object.assign({}, elLoadingOptions),
    vuexKey,
  },
  getters,
  mutations,
  actions,
  plugins: [createPersistedState(config)],
});
