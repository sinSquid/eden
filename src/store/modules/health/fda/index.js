import api from './api';
import proCall from '@/utils/standard/action-util';

const params = {
  skip: 0, // 当前页
  limit: 5, // 获取数量
  search: '', // 过滤参数
  count: '', // 计数某个关键字
  sort: '', // 按字段排序 asc、desc
};

export default {
  namespaced: true,
  state: {
    activeTab: 'description',
    food: {
      params,
      meta: {},
      results: [],
      total: 0,
    },
    drug: {
      params,
      meta: {},
      results: [],
      total: 0,
    },
  },
  actions: {
    // 食品与药品区分枚举，type:food、drug
    async getFDAEvent({ state, commit }) {
      const type = state.activeTab;
      const param = { type };
      for (const [key, value] of _.toPairs(state[type].params)) {
        if (value !== '') {
          param[key] = value;
        }
      }
      const result = await api.getFDAEvent(param);
      const { data: { meta, results } } = result;
      commit('setFDAEvent', {
        meta, results, total: meta.results.total, type,
      });
      return proCall(result);
    },
  },
  mutations: {
    setFDAEvent(state, paylaod) {
      const data = _.cloneDeep(paylaod);
      _.assign(state[paylaod.type], _.omit(data, ['type']));
    },
    setActiveTab(state, payload) {
      state.activeTab = payload.tab;
    },
    setFDAParams(state, payload) {
      const type = state.activeTab;
      _.assign(state[type].params, payload);
    },
  },
};
