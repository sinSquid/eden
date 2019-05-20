import api from './api';

export default {
  namespaced: true,
  state: {
    breeds: [],
  },
  getters: {

  },
  actions: {
    async getListBreeds() {
      const result = await api.getListBreeds();
      return result;
    },
  },
  mutations: {
    setDogBreeds(state, payload) {
      state.breeds = payload;
    },
  },
};
