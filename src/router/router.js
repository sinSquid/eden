import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import { Login, Home } from '@/router/constMenu.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
