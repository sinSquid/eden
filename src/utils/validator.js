/**
* @Description: 校检函数集合
* @Author: sinSquid
* @date: 2019/4/27
* @Params: val传入校检规则rule
* @Return: 校检结果 错误提示/正确回调函数
*/

import tpRegular from '@/lib/regular';

/**
* @Description: 校检用户名
* @Author: sinSquid
* @date: 2019/4/27
* @Params: 传入规则、校检值、回调函数
* @Return: 错误提示、回调函数
*/
function validateUserName(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  const reg = tpRegular.username;
  if (!reg.test(value)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}

/**
* @Description: 校检密码
* @Author: sinSquid
* @date: 2019/4/27
* @Params: 传入规则、校检值、回调函数
* @Return: 错误提示、回调函数
*/
function validatePassword(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  const reg = tpRegular.password;
  if (!reg.test(value)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}

export default {
  validateUserName,
  validatePassword,
};
