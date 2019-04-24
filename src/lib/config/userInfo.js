const originUserInfo = {
  username: '', // 用户名
  password: '', // 密码
  avatar: '', // 头像
  role: '', // 角色
  remark: '', // 备注
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
