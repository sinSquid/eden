import Cookie from 'js-cookie';

const tokenKey = 'tp-admin'; // cookie
/**
* @Description: js-cookie获取、设置、移除cookie，expires不设置则默认cookie有效期为会话
* @Author: sinSquid
* @date: 2019/5/16
* @Params: null、token、null
* @Return: cookie、null、null
*/

function getToken() {
  return Cookie.get(tokenKey);
}

function setToken(token) {
  Cookie.set(tokenKey, token);
}

function removeToken() {
  Cookie.remove(tokenKey);
}

export {
  getToken,
  setToken,
  removeToken,
};
