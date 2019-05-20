import qs from 'qs';
// dog api
import axios from '@/lib/axios/index';

/**
* @Description: 获取狗子数据，基于https://dog.ceo/dog-api/拉取数据
* @Author: sinSquid
* @date: 2019/5/17
* @Params: 详见官网
* @Return: jsonData
*/

export default {
  // 获取所有狗子品种
  getListBreeds: () => axios.get('https://dog.ceo/api/breeds/list/all'),
};
