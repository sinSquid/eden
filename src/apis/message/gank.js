// 干货集中营、gank
import axios from '@/lib/axios/index';

/**
 * @Description: 干货集中营，https://gank.io/api
 * @Author: sinSquid
 * @date: 2019/12/15
 * @Params: 详见官网
 * @Return: jsonData
 */

const prefix = 'https://gank.io/api'; // 前缀
const v2Prefix = 'https://gank.io/api/v2'; // v2版本前缀

// 每日数据: http://gank.io/api/day/年/月/日
const getDay = (params) => axios.get(`${prefix}/day/${params}`);

/* 文章详情 API
post_id 可接受参数 文章id[分类数据API返回的_id字段] */
const getArticle = (params) => axios.get(`${v2Prefix}/post${params}`);

export {
  getDay,
  getArticle,
};
