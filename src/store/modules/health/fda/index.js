import api from './api';
import proCall from '@/utils/standard/action-util';
import { detail } from '@/views/health/fda/lib/data';

const params = {
  skip: 0, // 当前页
  limit: 6, // 获取数量
  search: '', // 过滤参数
  count: '', // 计数某个关键字
  sort: '', // 按字段排序 asc、desc
};
// 结构构成
const structure = {
  params,
  meta: {},
  results: [],
  total: 0,
  data: [], // 展示使用数据
};

const originDown = {
  meta: {},
  results: {
    food: [],
    drug: [],
    device: [],
    animalandveterinary: [],
    other: [],
  },
};

export default {
  namespaced: true,
  state: {
    activeTab: 'description',
    fda: {
      food: _.cloneDeep(structure),
      drug: _.cloneDeep(structure),
    },
    down: _.cloneDeep(originDown),
  },
  getters: {
    detailTab(state) {
      return state.activeTab === 'food' ? 'food' : 'drug';
    },
  },
  actions: {
    // 食品与药品区分枚举，type:food、drug
    async getFDAEvent({ state, commit }) {
      const type = state.activeTab;
      const param = { type };
      for (const [key, value] of _.toPairs(state.fda[type].params)) {
        if (value !== '') {
          param[key] = value;
        }
      }
      const result = await api.getFDAEvent(param);
      const { status, data: { meta, results } } = result;
      if (status === 200) {
        // 处理展示数据
        const aims = _.cloneDeep(results);
        const data = [];
        const keys = detail[type].map(e => e.key);
        if (type === 'food') {
          for (const re of aims) {
            _.assign(re, re.consumer);
            data.push(_.pick(re, keys));
          }
        } else {
          for (const re of aims) {
            data.push(_.pick(re, keys));
          }
        }

        commit('setFDAEvent', {
          meta, results, total: meta.results.total, type, data,
        });
      }
      return proCall(result);
    },
    async getDownList({ state }) {
      const result = await api.getDownList();
      const { status, data: { meta, results } } = result;
      if (status === 200) {
        state.down = _.cloneDeep(originDown);
        state.down.meta = meta;
        for (const [key, grant] of _.toPairs(results)) {
          for (const [category, son] of _.toPairs(grant)) {
            for (const child of son.partitions) {
              const aims = _.assign({ category, total_records: son.total_records }, child);
              state.down.results[key].push(aims);
            }
          }
        }
      }
      return proCall(result);
    },
  },
  mutations: {
    setFDAEvent(state, paylaod) {
      const data = _.cloneDeep(paylaod);
      _.assign(state.fda[paylaod.type], _.omit(data, ['type']));
    },
    setActiveTab(state, payload) {
      state.activeTab = payload.tab;
    },
    setFDAParams(state, payload) {
      const type = state.activeTab;
      _.assign(state.fda[type].params, payload);
    },
  },
};
