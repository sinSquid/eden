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
};
export default mutations;
