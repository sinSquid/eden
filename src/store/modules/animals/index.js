import dog from './dog';
import cat from './cat';

export default {
  name: 'moduleAnimals',
  namespaced: true,
  state: {

  },
  mutations: {
  },
  modules: {
    dog,
    cat,
  },
};
