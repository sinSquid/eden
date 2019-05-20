import dog from './dog';
import cat from './cat';

export default {
  name: 'moduleAnimals',
  namespaced: true,
  state: {
    name: 'test',
  },
  getters: {

  },
  actions: {

  },
  mutations: {
  },
  modules: {
    dog,
    cat,
  },
};
