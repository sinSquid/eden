import Vue from 'vue'
import Vuex from 'vuex'

// 引入modules
import userInfo from '@/store/modules/userInfo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userInfo
  },
  state: {
    tpTabs: [], // tabs菜单
    activeTabsName: ''// 激活的tabs，无子项时默认空
  },
  mutations: {
    setActiveTabsName (state, payload) {
      state.activeTabsName = payload.name
    }
  },
  actions: {
  }
})
