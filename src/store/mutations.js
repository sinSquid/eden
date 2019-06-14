import { getTimestamp } from '@/utils/date/extend-dayjs';

const mutations = {
  setGlobalMessage(state, payload) {
    const timestamp = getTimestamp();
    _.assign(state.globalMessage, payload, { timestamp });
  },
  openLoading(state, payload) {
    state.loading = payload;
  },
  closeLoading(state, payload) {
    state.loading = payload;
  },
  setGlobalLoading(state, payload) {
    _.assign(state.globalLoading, payload);
  },
  setUserInfo(state, payload) {
    _.assign(state.userInfo, payload);
  },
  setUserToken(state, payload) {
    state.token = payload.token;
  },
};
export default mutations;
