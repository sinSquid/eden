import Cookie from 'js-cookie';

const LocalToken = 'admin';

function getToken() {
  return Cookie.get(LocalToken);
}

function setToken(token) {
  Cookie.set(LocalToken, token);
}

function removeToken() {
  Cookie.remove(LocalToken);
}

export {
  getToken,
  setToken,
  removeToken,
};
