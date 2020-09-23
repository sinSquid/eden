import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import createPersistedState from 'vuex-persistedstate';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入elementUI配置文件
import { elLoadingOptions, elMessageOptions } from '@/lib/element/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalMessage: { ...elMessageOptions }, // 全局通知，基于elementUI的message
    userInfo: { ...originUserInfo },
    netWorkError: { message: '网络错误,请稍后再试', type: 'error' },
    globalLoading: { ...elLoadingOptions },
    currentTab: undefined,
    tabsList: [],
    menusList: [],
  },
  getters,
  mutations,
  actions,
  plugins: [createPersistedState({
    key: 'edenStorage',
    storage: window.sessionStorage,
    // 返回需要的
    reducer: (state) => _.pick(state, ['userInfo', 'currentTab', 'menusList']),
  })],
});
