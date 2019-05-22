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
    async getRandomDogInBreed(data) {
      const result = await api.getRandomDogInBreed(data);
      return proCall(result);
    },
  },
  mutations: {
    // 初始化数据，一次commit提交，减少记录
    initializeBreeds(state, payload) {
      // 种类源数据
      state.breeds = payload;

      _.keys(payload).forEach((key) => {
        const aims = payload[key];

        // 级联数据
        if (aims.length) {
          // 存在的品种
          state.existBreeds = _.concat(state.existBreeds, aims);

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
      // 去重排序
      state.existBreeds = _.uniq(state.existBreeds);
      state.existBreeds.sort((a, b) => (a <= b ? -1 : 1));
    },
  },
};
