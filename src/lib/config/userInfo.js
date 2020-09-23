const originUserInfo = {
  id: undefined,
  avatar: '', // 头像
  role: '', // 角色
  nickname: '', // 用户名
  status: 1, // 状态-默认初始化离线
};

const roleMapping = [
  { value: 1, label: '创建者' },
  { value: 2, label: '管理员' },
  { value: 3, label: '维护员' },
  { value: 4, label: '用户' },
];

export {
  originUserInfo,
  roleMapping,
};
