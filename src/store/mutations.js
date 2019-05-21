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
  setUserInfo(state, payload) {
    state.userInfo = Object.assign({}, payload);
  },
  setUserToken(state, payload) {
    state.token = payload.token;
  },
};
export default mutations;
