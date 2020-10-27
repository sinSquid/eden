// 干货集中营、gank
import axios from '@/lib/axios/checkStatus';

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

/* 首页banner轮播 */
const getBanners = () => axios.get(`${v2Prefix}/banners`);

/* 随机 API
https://gank.io/api/v2/random/category/<category>/type/<type>/count/<count>
请求方式: GET
category 可接受参数 Article | GanHuo | Girl
type 可接受参数 Android | iOS | Flutter | Girl，即分类API返回的类型数据
count: [1, 50] */

const getRandomData = (params) => axios.get(`${v2Prefix}/random/category/${params.category}/type/${params.type}/count/${params.count}`);

export {
  getDay,
  getArticle,
  getBanners,
  getRandomData,
};
