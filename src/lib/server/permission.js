// 仿写登录过程
import router from '@/router';
import store from '@/store/store';
import { getToken } from './token';

const whiteList = ['/login']; // 不定向白名单

router.beforeEach((to, from, next) => {
  if (getToken()) { // 已登录，cookie可查
    if (to.path === '/login') {
      next();
    } else if (store.getters.userInfo.roles.length === 0) { // 无登录
      store.dispatch('userInfo/getUserInfo').then((res) => {
        if (res.code === 0) {
          next();
        }
      }).catch((err) => {
        store.dispatch('userInfo/failLogOut').then(() => {
          // 错误警告走全局vuex
          store.commit('setGlobalMessage', { message: err, type: 'error' });
          next({ path: '/home' });
        });
      });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next({ path: '/login' });
  }
});
