import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
