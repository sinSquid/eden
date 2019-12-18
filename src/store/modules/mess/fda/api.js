/* openFDA api
Food and Drug Administration */
import axios from '@/lib/axios/index';
import { fda } from '@/lib/auth/health';

/**
 * @Description: 获取fda数据，基于https://open.fda.gov/apis/拉取数据
 * @Author: sinSquid
 * @date: 2019/7/22
 * @Params: 详见官网
 * @Return: jsonData
 */
const auth = params => ({ params: _.assign(_.omit(params, ['type']), { api_key: fda.api_key }) });

export default {
  // 获取food、drug数据：
  getFDAEvent: params => axios.get(`https://api.fda.gov/${params.type}/event.json`, auth(params)),
  // 获取下载列表信息
  getDownList: () => axios.get('https://api.fda.gov/download.json', auth({})),
};
