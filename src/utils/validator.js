/**
* @Description: 校检函数集合
* @Author: sinSquid
* @date: 2019/4/27
* @Params: val传入校检规则rule
* @Return: 校检结果 错误提示/正确回调函数
*/

import regular from '@/lib/regular';

/**
* @Description: 校检用户名
* @Author: sinSquid
* @date: 2019/4/27
* @Params: 传入规则、校检值、回调函数
* @Return: 错误提示、回调函数
*/

/**
 * 用户名校检
 * @param rule {Object} 规则
 * @param value
 * @param callback
 */
function validateUserName(rule, value, callback) {
  const reg = regular.username;
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

/**
 * 密码校检
 * @param rule {Object} 规则
 * @param value
 * @param callback
 */
function validatePassword(rule, value, callback) {
  const reg = regular.password;
  if (!reg.test(value)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}

/**
 * 100内校检
 * @param rule {Object} 规则
 * @param value
 * @param callback
 */
function validateHundred(rule, value, callback) {
  const reg = regular.innerHundred;
  if (!reg.test(value)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}

export {
  validateUserName,
  validatePassword,
  validateHundred,
};
