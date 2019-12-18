// camp api
import axios from '@/lib/axios/index';
// import proCall from '@/utils/xhr/procall';

/**
 * @Description: 干货集中营，http://gank.io/api
 * @Author: sinSquid
 * @date: 2019/12/15
 * @Params: 详见官网
 * @Return: jsonData
 */

export default {
  // 获取最新一天的干货
  getToday: () => axios.get('http://gank.io/api/today'),
};
