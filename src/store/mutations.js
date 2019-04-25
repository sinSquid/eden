const mutations = {
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
};
export default mutations;
