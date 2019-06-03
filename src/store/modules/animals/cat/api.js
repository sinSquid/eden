// dog api
import axios from '@/lib/axios/index';
import { apiKey } from '@/lib/auth/catapi';

/**
 * @Description: 获取喵喵数据，基于https://docs.thecatapi.com/拉取数据
 * @Author: sinSquid
 * @date: 2019/6/3
 * @Params: 详见官网
 * @Return: jsonData
 */

// catapi需要key认证，不能和其他axios共用，需要拷贝一份独立axios
const catAxios = _.cloneDeep(axios);
axios.defaults.headers.common['x-api-key'] = apiKey;

export default {
  // 获取所有喵喵品种
  getListBreeds: params => catAxios.get('https://api.thecatapi.com/v1/breeds', params),
  // 筛选喵喵
  getFilterBreeds: params => catAxios.get('https://api.thecatapi.com/v1/breeds/search', params),
};
