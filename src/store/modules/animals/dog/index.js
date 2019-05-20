import api from './api';
import proCall from '@/utils/standard/action-util';

export default {
  namespaced: true,
  state: {
    breeds: {},
    existBreeds: [],
    cascadeOptions: [], // 级联配置
  },
  actions: {
    async getListBreeds({ rootState, commit }) {
      const result = await api.getListBreeds();
      const { status, message } = result.data || {};
      if (result.status === 200 && status === 'success') {
        commit('setDogBreeds', message);
        commit('setExistBreeds', message);
        commit('setCascadeOptions', message);
      } else {
        commit('setGlobalMessage',
          { type: 'error', message: message || rootState.netWorkError },
          { root: true });
      }
      return proCall(result);
    },
    async getRandomDog() {
      const result = await api.getRandomDog();
      return proCall(result);
    },
  },
  mutations: {
    setDogBreeds(state, payload) {
      state.breeds = payload;
    },
    setExistBreeds(state, payload) {
      _.keys(payload).forEach((key) => {
        _.concat(state.existBreeds, payload[key]);
      });
      _.uniq(state.existBreeds);
    },
    setCascadeOptions(state, payload) {
      _.keys(payload).forEach((key) => {
        const aims = payload[key];
        if (aims.length) {
          const obj = {
            value: key,
            label: key,
            children: [],
          };
          aims.forEach((e) => {
            obj.children.push({
              value: e,
              label: e,
            });
          });
          state.cascadeOptions.push(obj);
        }
      });
    },
  },
};
