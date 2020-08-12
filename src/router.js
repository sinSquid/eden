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
      redirect: '/home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          redirect: '/home/intro',
          children: [{
            path: '/home/intro', // 简介
            name: 'intro',
            component: () => import('@/views/home/intro/index.vue'),
          }, {
            path: '/home/license',
            name: 'license',
            component: () => import('@/views/home/license/index.vue'),
          }],
        }, {
          path: '/message',
          name: 'message',
          component: () => import('@/views/message/index.vue'),
          redirect: '/message/camp',
          children: [{
            path: '/message/camp',
            name: 'camp',
            component: () => import('@/views/message/camp/index.vue'),
            redirect: '/message/camp/home',
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
          }],
        }, {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
          redirect: '/user/me',
          children: [{
            path: '/user/me',
            name: 'me',
            component: () => import('@/views/user/me/index.vue'),
          }, {
            path: '/user/more',
            name: 'more',
            component: () => import('@/views/user/more/index.vue'),
          }],
        }, {
          path: '/animals',
          name: 'animals',
          component: () => import('@/views/animals/index.vue'),
          redirect: '/animals/dog',
          children: [{
            path: '/animals/dog',
            name: 'dog',
            component: () => import('@/views/animals/dog/index.vue'),
          }, {
            path: '/animals/cat',
            name: 'cat',
            component: () => import('@/views/animals/cat/index.vue'),
          }],
        }, {
          path: '/health',
          name: 'health',
          component: () => import('@/views/health/index.vue'),
          redirect: '/health/doctor',
          children: [{
            path: '/health/doctor',
            name: 'doctor',
            component: () => import('@/views/health/doctor/index.vue'),
          }, {
            path: '/health/fda',
            name: 'fda',
            component: () => import('@/views/health/fda/index.vue'),
          }],
        },
      ],
    }, {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
  ],
});
