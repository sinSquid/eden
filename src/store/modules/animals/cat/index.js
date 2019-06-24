import api from './api';
import proCall from '@/utils/standard/action-util';

export default {
  namespaced: true,
  state: {
    originData: [],
    originImages: [],
  },
  actions: {
    async getListBreeds({ commit }) {
      const result = await api.getListBreeds();
      const { status, data } = result || { status: 404, data: [] };
      if (status === 200 && data.length) {
        commit('setOriginData', data);
      }
      return proCall(result);
    },
    async getFilterBreeds(store, params) {
      const result = await api.getFilterBreeds(params);
      return proCall(result);
    },
    async getCategories() {
      const result = await api.getCategories();
      return proCall(result);
    },
    async getAllVotes(store, params) {
      const result = await api.getAllVotes(params);
      return proCall(result);
    },
    async getPublicImages({ commit }, params) {
      const result = await api.getPublicImages(params);
      const { status, data } = result || { status: 404, data: [] };
      if (status === 200) {
        commit('setOriginImages', data);
      }
      return proCall(result);
    },
    async createVote(store, params) {
      const result = await api.createVote(params);
      return proCall(result);
    },
    async deleteVote(store, params) {
      const result = await api.deleteVote(params);
      return proCall(result);
    },
    async getFavourites() {
      const result = await api.getFavourites();
      return proCall(result);
    },
    async createFavourite(store, params) {
      const result = await api.createFavourite(params);
      return proCall(result);
    },
    async deleteFavourite(store, params) {
      const result = await api.deleteFavourite(params);
      return proCall(result);
    },
    async uploadImage(store, params) {
      const result = await api.uploadImage(params);
      return proCall(result);
    },
    async getUploadImages(store, params) {
      const result = await api.getUploadImages(params);
      return proCall(result);
    },
    async deleteUploadImage(store, params) {
      const result = await api.deleteUploadImage(params);
      if (result.status === 200 || result.status === 204) {
        return Promise.resolve(result.data || {});
      }
      return Promise.reject(result);
    },
  },
  mutations: {
    setOriginData(state, payload) {
      state.originData = payload;
    },
    setOriginImages(state, payload) {
      state.originImages = payload;
    },
  },
};
