const getters = {
  sublayerRoute(state) {
    return state.menusList.reduce((acc, e) => ([...acc, ...e.children]), []);
  },
};
export default getters;
