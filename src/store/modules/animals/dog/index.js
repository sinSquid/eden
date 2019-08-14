import api from './api';
import proCall from '@/utils/xhr/procall';

export default {
  namespaced: true,
  state: {
    originBreeds: {},
    cascadeOptions: [], // 级联配置
  },
  actions: {
    async getListBreeds({ rootState, commit }) {
      const result = await api.getListBreeds();
      const { status, message } = result.data || {};
      if (result.status === 200 && status === 'success') {
        commit('initializeBreeds', message);
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
    async getRandomDogByBreed(store, params) {
      const result = await api.getRandomDogByBreed(params);
      return proCall(result);
    },
    async getRandomDogsLimit(store, params) {
      const result = await api.getRandomDogsLimit(params);
      return proCall(result);
    },
  },
  mutations: {
    // 初始化数据，一次commit提交，减少记录
    initializeBreeds(state, payload) {
      // 种类源数据
      state.originBreeds = payload;

      _.keys(payload).forEach((key) => {
        const obj = {
          value: key,
          label: key,
        };
        const child = payload[key];
        if (child.length) {
          obj.children = [];
          child.forEach((e) => {
            obj.children.push({
              value: e,
              label: e,
            });
          });
        }
        state.cascadeOptions.push(obj);
      });
    },
  },
};
