import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo';
// 引入elementUI配置文件
import { originMessageOptions } from '@/lib/element/config';

// 登录状态枚举
const userStatus = { // 0未登录，1登录，2隐匿
  quit: 0,
  online: 1,
  hidden: 2,
};

const netWorkError = { message: '网络错误,请稍后再试', type: 'error' };

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tpTabs: [], // tabs菜单
    activeTabsName: '', // 激活的tabs，无子项时默认空
    globalMessage: Object.assign({}, originMessageOptions), // 全局通知，基于elementUI的message
    userInfo: Object.assign({}, originUserInfo),
    userStatus,
    netWorkError,
    token: '',
  },
  getters,
  mutations,
  actions,
});
