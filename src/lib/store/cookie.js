import Cookie from 'js-cookie';

const tokenKey = 'eden'; // cookie
/**
 * @Description: js-cookie获取、设置、移除cookie，expires不设置则默认cookie有效期为会话
 * @Author: sinSquid
 * @date: 2019/5/16
 */

const getUserToken = () => Cookie.get(tokenKey);

const setUserToken = (val, config) => {
  Cookie.set(tokenKey, val, config);
};

const removeUserToken = () => {
  Cookie.remove(tokenKey);
};

export {
  getUserToken,
  setUserToken,
  removeUserToken,
};
