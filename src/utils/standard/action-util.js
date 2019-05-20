/**
 * @Description: 将axios请求内容转换为promise
 * @Author: sinSquid
 * @date: 2019/5/20
 * @Params: response
 * @Return: promise
 */
const proCall = response => new Promise((resolve, reject) => {
  if (response.status === 200) {
    resolve(response.data);
  } else {
    reject(response);
  }
});

export default proCall;
