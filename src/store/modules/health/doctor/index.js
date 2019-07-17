import api from './api';
import proCall from '@/utils/standard/action-util';

export default {
  namespaced: true,
  state: {
    doctor: {
      name: '',
      query: '',
      specialty_uid: '', // 专业的UID
      insurance_uid: '', // 保险计划的UID
      location: '37.773,-122.413,100',
      user_location: '37.773,-122.413',
      gender: '',
      sort: '',
      fields: '',
      skip: 1,
      limit: 10,
    },
    origin: {
      data: [],
      total: 0,
    },
  },
  actions: {
    async searchDoctors({ state, commit }) {
      const params = {};
      _.toPairs(state.doctor).forEach(([key, value]) => {
        if (value) {
          params[key] = value;
        }
      });
      const result = await api.searchDoctors(params);
      const { data: { meta: { total }, data } } = result;
      commit('setOriginData', { data, total });
      return proCall(result);
    },
  },
  mutations: {
    setDoctor(state, payload) {
      _.assign(state.doctor, payload);
    },
    setOriginData(state, payload) {
      _.assign(state.origin, payload);
    },
  },
};
