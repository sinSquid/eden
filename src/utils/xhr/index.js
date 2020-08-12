/**
 * @Description: 校检axios返回的response
 * @Author: sinSquid
 * @date: 2020/8/12
 * @Params: response
 * @Return: data/message
 */
import store from '@/store/store';

function checkStatus(response) {
  const { status, data } = response || {};
  let msg;
  if ([200, 201, 203, 304].includes(status)) {
    return data;
  }
  switch (status) {
    case 400:
      msg = '错误请求';
      break;
    case 401:
      msg = '访问令牌无效或已过期';
      break;
    case 403:
      msg = '拒绝访问';
      break;
    case 404:
      msg = '资源不存在';
      break;
    case 500:
      msg = '访问服务失败';
      break;
    case 502:
      msg = '无效网关';
      break;
    case 503:
      msg = '服务不可用';
      break;
    default:
      msg = '连接错误';
  }
  store.commit('setGlobalMessage', { message: `[${status}]:${msg}`, type: 'error' });
  return response;
}

const placeholder = 1;

export {
  checkStatus,
  placeholder,
};
