// doctor api
import axios from '@/lib/axios/index';

/**
 * @Description: 获取doctor数据，基于https://developer.betterdoctor.com/documentation15拉取数据
 * @Author: sinSquid
 * @date: 2019/7/9
 * @Params: 详见官网
 * @Return: jsonData
 */

export default {
  // 获取所有狗子品种
  getListBreeds: () => axios.get('https://dog.ceo/api/breeds/list/all'),
};
