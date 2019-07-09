import api from './api';
import proCall from '@/utils/standard/action-util';

export default {
  namespaced: true,
  state: {
  },
  actions: {
    async getRandomDog() {
      const result = await api.getRandomDog();
      return proCall(result);
    },
  },
  mutations: {

  },
};
