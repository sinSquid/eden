import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue'),
    },
    {
      path: '/',
      name: 'main',
      redirect: 'home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          redirect: 'home/intro',
          children: [{
            path: 'intro', // 简介
            name: 'intro',
            component: () => import('@/views/home/intro/index.vue'),
          }, {
            path: 'license',
            name: 'license',
            component: () => import('@/views/home/license/index.vue'),
          }],
        },
        {
          path: 'message',
          name: 'message',
          component: () => import('@/views/message/index.vue'),
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
        },
        {
          path: 'animals',
          name: 'animals',
          component: () => import('@/views/animals/index.vue'),
          redirect: 'animals/dog',
          children: [{
            path: 'dog',
            name: 'dog',
            component: () => import('@/views/animals/dog/index.vue'),
          }, {
            path: 'cat',
            name: 'cat',
            component: () => import('@/views/animals/cat/index.vue'),
          }],
        },
        {
          path: 'health',
          name: 'health',
          component: () => import('@/views/health/index.vue'),
          redirect: 'health/doctor',
          children: [{
            path: 'doctor',
            name: 'doctor',
            component: () => import('@/views/health/doctor/index.vue'),
          }, {
            path: 'fda',
            name: 'fda',
            component: () => import('@/views/health/fda/index.vue'),
          }],
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
  ],
});
