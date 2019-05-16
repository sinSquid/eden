const mutations = {
  setActiveTabsName(state, payload) {
    state.activeTabsName = payload.name;
  },
  setGlobalMessage(state, payload) {
    const keys = Object.keys(payload);
    if (keys.length > 0) {
      keys.forEach((key) => {
        state.globalMessage[key] = payload[key];
      });
    }
  },
  openLoading(state, payload) {
    state.loading = payload;
  },
  closeLoading(state, payload) {
    state.loading = payload;
  },
  setUserInfo(state, payload) {
    console.log(payload);
    state.userInfo = Object.assign({}, payload);
  },
  setUserToken(state, payload) {
    state.token = payload.token;
  },
  setCurrentSideRoutePath(state, payload) {
    state.currentSideRoutePath = payload.path;
  },
};
export default mutations;
