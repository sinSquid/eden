import { getTimestamp } from '@/utils/date/dayjs';

const mutations = {
  setGlobalMessage(state, payload) {
    const timestamp = getTimestamp();
    _.assign(state.globalMessage, { timestamp }, payload);
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
};
export default mutations;
