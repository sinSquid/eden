import { getTimestamp } from '@/utils/date/dayjs';
import router from '@/router';

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
  updateCurrentTab(state, payload) {
    state.currentTab = payload;
  },
  updateTabsList(state, payload) {
    const { tabsList } = state;
    const empty = tabsList.length === 0;
    if (empty || (!empty && tabsList.findIndex((t) => t.uri === payload.uri) === -1)) {
      state.tabsList = [...tabsList, payload];
    }
  },
  /**
   * @Description: 移除当前tab[仅在tab数量大于1时UI层可用]，删除当前tab后，默认将currentTab置为tabsList最后一个
   * @Author: sin
   * @date: 2020/9/11
   */
  removeCurrentTab(state, payload) {
    const { tabsList, currentTab } = state;
    const list = tabsList.filter((e) => e.uri !== payload);
    const [{ uri: lastUri }] = [...list].reverse();
    state.tabsList = list;
    if (currentTab !== lastUri) {
      state.currentTab = lastUri;
      router.push({ path: lastUri });
    }
  },
  /**
   * @Description: 菜单设置
   * @Author: sin
   * @date: 2020/9/21
   * @Params: 菜单
   */
  setMenusList(state, payload) {
    state.menusList = payload;
  },
};
export default mutations;
