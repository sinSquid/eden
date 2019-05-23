const mutations = {
  setGlobalMessage(state, payload) {
    Object.assign(state.globalMessage, payload);
  },
  openLoading(state, payload) {
    state.loading = payload;
  },
  closeLoading(state, payload) {
    state.loading = payload;
  },
  setGlobalLoading(state, payload) {
    Object.assign(state.globalLoading, payload);
  },
  setUserInfo(state, payload) {
    Object.assign(state.userInfo, payload);
  },
  setUserToken(state, payload) {
    state.token = payload.token;
  },
};
export default mutations;
