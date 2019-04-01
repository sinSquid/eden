import Vue from 'vue'
import Router from 'vue-router'
import framework from '@/views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: () => import('@/views/404.vue')
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: framework,
      children: [{
        path: 'home',
        component: () => import('@/views/Home.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ]
})
