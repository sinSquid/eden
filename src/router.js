import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: () => import('@/views/404.vue')
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ]
})
