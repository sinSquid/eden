// cat api
import axios from '@/lib/axios/index';
import { apiKey, userID } from '@/lib/auth/catapi';

/**
 * @Description: 获取喵喵数据，基于https://docs.thecatapi.com/拉取数据
 * @Author: sinSquid
 * @date: 2019/6/3
 * @Params: 详见官网
 * @Return: jsonData
 */

// catapi需要key认证
const headers = {
  common: {
    'x-api-key': apiKey,
  },
};
export default {
  // 获取所有喵喵品种
  getListBreeds: params => axios.get('https://api.thecatapi.com/v1/breeds', params),
  // 筛选喵喵
  getFilterBreeds: params => axios.get('https://api.thecatapi.com/v1/breeds/search', { params }),
  // 获取系统中的活动类别
  getCategories: () => axios.get('https://api.thecatapi.com/v1/categories'),
  // 获取账户所有的投票
  getAllVotes: (filter) => {
    // 需要+sub_id过滤
    const params = filter ? { sub_id: userID } : null;
    return axios.get('https://api.thecatapi.com/v1/votes', { headers, params });
  },
};
