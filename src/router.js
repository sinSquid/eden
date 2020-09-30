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
          name: 'intro',
          component: () => import('@/views/home/intro/index.vue'),
        }, {
          path: '/home/license',
          name: 'license',
          component: () => import('@/views/home/license/index.vue'),
        }, {
          path: '/message/camp',
          name: 'camp',
          component: () => import('@/views/message/camp/index.vue'),
          children: [{
            path: '/message/camp/category',
            name: 'category',
            component: () => import('@/views/message/camp/category/index.vue'),
          }, {
            path: '/message/camp/recall',
            name: 'recall',
            component: () => import('@/views/message/camp/recall/index.vue'),
          }, {
            path: '/message/camp/home',
            name: 'recall',
            component: () => import('@/views/message/camp/home/index.vue'),
          }, {
            path: '/message/camp/welfare',
            name: 'welfare',
            component: () => import('@/views/message/camp/welfare/index.vue'),
          }],
        }, {
          path: '/user/me',
          name: 'me',
          component: () => import('@/views/user/me/index.vue'),
        }, {
          path: '/user/more',
          name: 'more',
          component: () => import('@/views/user/more/index.vue'),
        }, {
          path: '/animals/dog',
          name: 'dog',
          component: () => import('@/views/animals/dog/index.vue'),
        }, {
          path: '/animals/cat',
          name: 'cat',
          component: () => import('@/views/animals/cat/index.vue'),
        }, {
          path: '/health/doctor',
          name: 'doctor',
          component: () => import('@/views/health/doctor/index.vue'),
        }, {
          path: '/health/fda',
          name: 'fda',
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
