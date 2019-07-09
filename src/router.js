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
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'home',
          // name: 'home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('@/views/message/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
        },
        {
          path: '/animals',
          name: 'animals',
          component: () => import('@/views/animals/index.vue'),
          redirect: '/animals/dog',
          children: [{
            path: 'dog',
            name: 'dog',
            component: () => import('@/views/animals/dog/index.vue'),
            meta: { title: 'dog', icon: 'dog', noCache: true },
          }, {
            path: 'cat',
            name: 'cat',
            component: () => import('@/views/animals/cat/index.vue'),
            meta: { title: 'cat', icon: 'cat', noCache: true },
          }],
        },
        {
          path: '/health',
          name: 'health',
          component: () => import('@/views/health/index.vue'),
          redirect: '/health/doctor',
          children: [{
            path: 'doctor',
            name: 'doctor',
            component: () => import('@/views/health/doctor/index.vue'),
            meta: { title: 'doctor', noCache: true },
          }, {
            path: 'clinical',
            name: 'clinical',
            component: () => import('@/views/health/clinical/index.vue'),
            meta: { title: 'clinical', noCache: true },
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
