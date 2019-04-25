import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

// 引入modules
import userInfo from '@/store/modules/userInfo/index';

// 引入elementUI配置文件
import { originMessageOptions } from '@/lib/element/config';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
  },
  state: {
    tpTabs: [], // tabs菜单
    activeTabsName: '', // 激活的tabs，无子项时默认空
    globalMessage: Object.assign({}, originMessageOptions), // 全局通知，基于elementUI的message
  },
  getters,
  mutations,
  actions,
});
