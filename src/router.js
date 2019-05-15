import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/views/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: () => import('@/views/404.vue'),
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: layout,
      children: [{
        path: 'home',
        component: () => import('@/views/Home.vue'),
      }],
    },
    {
      path: '/animals',
      name: 'animals',
      redirect: '/animals/dog',
      component: layout,
      children: [{
        path: 'dog',
        name: 'dog',
        component: () => import('@/views/animals/dog/index.vue'),
        meta: { title: 'dog', icon: 'dog', noCache: true },
      }],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
  ],
});
