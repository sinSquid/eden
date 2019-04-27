/**
* @Description: 正则表达式集合
* @Author: sinSquid
* @date: 2019/4/27
* @Params: null
* @Return: null
*/

// tpRegular(takeaway-platform缩写)
const tpRegular = {
  username: /^[a-z0-9]{3,12}$/, // 3-12为字母、数字集合
  password: /^[a-z0-9_-]{6,18}$/, // 6-18数字、字母含下划线、横线
};

export default {
  tpRegular,
};
