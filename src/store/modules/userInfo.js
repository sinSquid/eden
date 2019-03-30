// 用户信息模块
import { originUserInfo } from '@/lib/config/userInfo.js'

export default {
  state: {
    userInfo: Object.assign({}, originUserInfo),
    status: 0 // 0未登录， 1登录
  },
  mutations: {
    setUserStatus (state, payload) {
      state.status = payload.status
    }
  },
  actions: {

  }
}
