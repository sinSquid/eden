const NavPermission = {
  home: 1,
  message: 1,
  userInfo: 1,
};

const permissionMapping = {
  PERMISSION_HOME: 1, // 主页
  PERMISSION_MESS_ELE: 20, // 饿了么
  PERMISSION_MESS_Zhihu: 21, // 知乎
  PERMISSION_INFO_SELF: 30, // 个人信息
  PERMISSION_INFO_: 31, // 信息汇总
};

const rolePermission = {
  1: true,
  20: true,
  21: false,
  30: true,
  31: true,
};

export {
  NavPermission,
  permissionMapping,
  rolePermission,
};
