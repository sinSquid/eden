// 仿写登录过程
import router from '@/router.js'
import store from '@/store/store.js'
import { getToken } from './token.js'

const whiteList = ['/login'] // 不定向白名单

router.forEach((to, from, next) => {
  if (getToken()) { // 已登录，cookie可查
    if (to.path === '/login') {
      next()
    } else {
      if (store.getters.userInfo.roles.length === 0) { // 无登录
        store.dispatch('userInfo/getUserInfo').then(res => {
          if (res.code === 0) {
            next()
          }
        }).catch(err => {
          store.dispatch('userInfo/failLogOut').then(() => {
            // 错误警告
            next({ path: '/home' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
