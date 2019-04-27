import api from '@/store/api';

const actions = {
  signOut({ state }, data) {
    api.signOut(data).then(() => {
      window.location.href = `${state.requestPrefix}/user/login`;
    });
  },
};
export default actions;
