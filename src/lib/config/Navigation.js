// 同步路由path

const NavList = [
  {
    label: '首页',
    value: 'home',
    url: '/',
    icon: 'icon1',
  }, {
    label: '资讯',
    value: 'message',
    url: '/message',
    icon: 'icon2',
  }, {
    label: '用户信息',
    value: 'user',
    url: '/user',
    icon: 'icon3',
  }, {
    label: '动物世界',
    value: 'animals',
    url: '/animals',
    icon: 'icon4',
  }, {
    label: '健康中心',
    value: 'health',
    url: '/health',
    icon: 'icon5',
  },
];

const mainRoute = [
  {
    value: 'home',
    label: 'home',
  }, {
    value: 'message',
    label: 'message',
  }, {
    value: 'user',
    label: 'user',
  }, {
    value: 'animals',
    label: 'animals',
    children: [
      {
        value: 'dog',
        label: 'dog',
      }, {
        value: 'cat',
        label: 'cat',
      },
    ],
  }, {
    value: 'health',
    label: 'health',
    children: [
      {
        value: 'doctor',
        label: 'doctor',
      }, {
        value: 'clinical',
        label: 'clinical',
      },
    ],
  },
];

export {
  NavList,
  mainRoute,
};
