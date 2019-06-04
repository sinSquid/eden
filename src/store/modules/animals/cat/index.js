import api from './api';
import proCall from '@/utils/standard/action-util';

export default {
  namespaced: true,
  state: {
    originData: [],
  },
  actions: {
    async getListBreeds({ rootState, commit }) {
      const result = await api.getListBreeds();
      const { status, data } = result || { status: 404, data: [] };
      if (status === 200 && data.length) {
        commit('setOriginData', data);
      } else {
        commit('setGlobalMessage',
          { type: 'error', message: rootState.netWorkError },
          { root: true });
      }
      return proCall(result);
    },
    async getFilterBreeds(store, params) {
      const result = await api.getFilterBreeds(params);
      return proCall(result);
    },
  },
  mutations: {
    setOriginData(state, payload) {
      state.originData = payload;
    },
  },
};
