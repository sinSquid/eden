// 仿写登录过程
import router from '@/router';
import { getToken } from './token';

const whiteList = ['/login']; // 不定向白名单
const hasToken = getToken();

router.beforeEach(async (to, from, next) => {
  if (hasToken) { // 已登录，cookie（token）有效期为本次会话
    if (to.path === '/login') { // 跳过登录
      next({ path: '/' });
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next({ path: '/login' });
  }
});
