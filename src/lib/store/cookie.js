import Cookie from 'js-cookie';

/**
 * @Description: js-cookie获取、设置、移除cookie，expires不设置则默认cookie有效期为会话
 * @Author: sinSquid
 * @date: 2019/5/16
 */

const getToken = key => Cookie.get(key);

const setToken = (key, val, config) => {
  Cookie.set(key, val, config);
};

const removeToken = (key) => {
  Cookie.remove(key);
};

export {
  getToken,
  setToken,
  removeToken,
};
