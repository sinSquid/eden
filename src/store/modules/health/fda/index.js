import api from './api';
import proCall from '@/utils/standard/action-util';

const params = {
  skip: 1, // 当前页
  limit: 0, // 获取数量
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
    async getFDAEvent({ state, commit }, type) {
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
  },
};
