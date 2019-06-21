// cat api
import axios from '@/lib/axios/index';
import { apiKey } from '@/lib/auth/catapi';

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
const json = { 'Content-Type': 'application/json' };
export default {
  // 获取所有喵喵品种
  getListBreeds: () => axios.get('https://api.thecatapi.com/v1/breeds'),
  // 筛选喵喵
  getFilterBreeds: params => axios.get('https://api.thecatapi.com/v1/breeds/search', { params }),
  // 获取系统中的活动类别
  getCategories: () => axios.get('https://api.thecatapi.com/v1/categories'),
  // 获取账户所有的投票
  getAllVotes: params => axios.get('https://api.thecatapi.com/v1/votes', { headers, params }),
  // 获取所有公共图片
  getPublicImages: params => axios.get('https://api.thecatapi.com/v1/images/search', { params }),
  // 创建一个评分
  createVote: params => axios.post('https://api.thecatapi.com/v1/votes', params,
    { headers: _.assign({}, headers, json) }),
  // 删除一个评分
  deleteVote: params => axios.delete(`https://api.thecatapi.com/v1/votes/${params}`, { headers }),
  // 获取喜爱的收藏夹
  getFavourites: () => axios.get('https://api.thecatapi.com/v1/favourites', { headers }),
  // 创建一个收藏
  createFavourite: params => axios.post('https://api.thecatapi.com/v1/favourites', params,
    { headers: _.assign({}, headers, json) }),
  // 删除一个收藏
  deleteFavourite: params => axios.delete(`https://api.thecatapi.com/v1/favourites/${params}`,
    { headers }),
  // 上传一张喵喵的图片
  uploadImage: params => axios.post('https://api.thecatapi.com/v1/images/upload', params,
    { headers: _.assign({}, headers, json) }),
  // 获取该用户上传的图片
  getUploadImages: params => axios.get('https://api.thecatapi.com/v1/images', { headers, params }),
  // 删除用户上传的图片
  deleteUploadImage: params => axios.delete(`https://api.thecatapi.com/v1/images/${params}`,
    { headers }),
};
