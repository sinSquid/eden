import Vue from 'vue';
import Vuex from 'vuex';

// 引入modules
import userInfo from '@/store/modules/userInfo/userInfo';

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
  mutations: {
    setActiveTabsName(state, payload) {
      state.activeTabsName = payload.name;
    },
    setGlobalMessage(state, payload) {
      const keys = Object.keys(payload.options);
      if (keys.length > 0) {
        keys.forEach((key) => {
          state.globalMessage.options[key] = payload[key];
        });
      }
    },
  },
  actions: {
  },
});
