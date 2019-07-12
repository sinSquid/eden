// doctor api
import axios from '@/lib/axios/index';
import { doctor } from '@/lib/auth/health';

/**
 * @Description: 获取doctor数据，基于https://developer.betterdoctor.com/documentation15拉取数据
 * @Author: sinSquid
 * @date: 2019/7/9
 * @Params: 详见官网
 * @Return: jsonData
 */
const auth = params => ({ params: _.assign(params, { user_key: doctor.user_key }) });

export default {
  // 依据信息检索医生资料
  searchDoctors: params => axios.get('https://api.betterdoctor.com/2016-03-01/doctors', auth(params)),
};
