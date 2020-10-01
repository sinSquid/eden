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
    }, {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue'),
    }, {
      path: '/',
      name: 'main',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/home/intro', // 简介
          name: 'home-intro',
          component: () => import('@/views/home/intro/index.vue'),
        }, {
          path: '/home/license',
          name: 'home-license',
          component: () => import('@/views/home/license/index.vue'),
        }, {
          path: '/message/camp',
          name: 'message-camp',
          component: () => import('@/views/message/camp/index.vue'),
        }, {
          path: '/user/me',
          name: 'user-me',
          component: () => import('@/views/user/me/index.vue'),
        }, {
          path: '/user/more',
          name: 'user-more',
          component: () => import('@/views/user/more/index.vue'),
        }, {
          path: '/animals/dog',
          name: 'animals-dog',
          component: () => import('@/views/animals/dog/index.vue'),
        }, {
          path: '/animals/cat',
          name: 'animals-cat',
          component: () => import('@/views/animals/cat/index.vue'),
        }, {
          path: '/health/doctor',
          name: 'health-doctor',
          component: () => import('@/views/health/doctor/index.vue'),
        }, {
          path: '/health/fda',
          name: 'health-fda',
          component: () => import('@/views/health/fda/index.vue'),
        },
      ],
    }, {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
  ],
});
