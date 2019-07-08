// 仿写登录过程
import router from '@/router';
import { getUserToken } from '@/lib/store/cookie';

const whiteList = ['/login']; // 不定向白名单

router.beforeEach(async (to, from, next) => {
  const hasToken = getUserToken();
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
