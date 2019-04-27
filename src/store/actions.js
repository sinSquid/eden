import api from '@/store/api';

const actions = {
  signOut({ state }, params) {
    api.signOut(params).then(() => {
      window.location.href = `${state.requestPrefix}/user/login`;
    });
  },
};
export default actions;
