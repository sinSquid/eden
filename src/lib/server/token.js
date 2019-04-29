import Cookie from 'js-cookie';

function getToken(token) {
  return Cookie.get(token);
}

function setToken(token, value) {
  Cookie.set(token, value);
}

function removeToken(token) {
  Cookie.remove(token);
}

export {
  getToken,
  setToken,
  removeToken,
};
