<template>
  <div class="cat-panel">
    <el-row type="flex" justify="start" :gutter="20">
      <el-col :span="12" class="left">
        <cat-table
          :data="originData"
          :loading="loading"
          :select.sync="select">
        </cat-table>
      </el-col>
      <el-col :span="12" class="right charts">
        <div class="title">
          <el-button
            type="warning"
            plain
            class="ui-mb-20"
            size="small"
            @click="drawCharts">
            analysis
          </el-button>
        </div>
        <div class="content">
          <divider-collapse :data="chartCollapse[0]"></divider-collapse>
          <ve-line v-if="chartVisible" :data="chartData"></ve-line>
          <divider-collapse :data="chartCollapse[1]"></divider-collapse>
          <ve-histogram v-if="chartVisible" :data="chartData"></ve-histogram>
          <divider-collapse :data="chartCollapse[2]"></divider-collapse>
          <ve-scatter v-if="chartVisible" :data="chartData"></ve-scatter>
          <divider-collapse :data="chartCollapse[3]"></divider-collapse>
          <ve-radar v-if="chartVisible" :data="chartData"></ve-radar>
        </div>
      </el-col>
    </el-row>
    <divider-collapse class="ui-mt-20" :data="searchCollapse[0]"></divider-collapse>
    <el-input
      :maxlength="20"
      clearable
      @clear="liquidData.rows[0].percent = 0"
      class="search-btn"
      v-model="search"
      :disabled="searchable"
      prefix-icon="el-icon-connection"
      suffix-icon="el-icon-search"
      placeholder="输入喵喵种类查询"
      @keyup.enter.native="searchBreeds">
    </el-input>
    <ve-liquidfill :data="liquidData" :settings="liquidSettings"></ve-liquidfill>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import catTable from './cat-table.vue';
import dividerCollapse from '@/components/divider-collapse/index.vue';

const columns = ['name', 'adaptability', 'child_friendly',
  'energy_level', 'health_issues', 'intelligence',
  'shedding_level', 'social_needs', 'vocalisation'];

const chart = [
  { key: 'line', label: '折线' },
  { key: 'histogram', label: '柱形' },
  { key: 'scatter', label: '散点' },
  { key: 'radar', label: '雷达' },
];

const liquidSettings = {
  wave: [0.75, 0.4, 0.15],
  seriesMap: {
    search: {
      color: ['#67C23A', '#f37c26', '#DCDFE6'],
    },
  },
};

const whiteList = { max: 10, min: 1 };

export default {
  name: 'catBreeds',
  components: {
    dividerCollapse,
    catTable,
  },
  data() {
    return {
      select: [],
      loading: true,
      chartData: {
        columns,
        rows: [],
      },
      chartCollapse: [],
      search: '',
      searchable: false,
      searchCollapse: [{
        divider: {
          title: 'cat&search',
        },
        collapse: [{
          title: 'search内容介绍',
          content: '检索输入关键词可检索到的喵喵种类',
        }],
      }],
      liquidData: {
        columns: ['breed', 'percent'],
        rows: [{
          breed: 'search',
          percent: 0,
        }],
      },
      liquidSettings,
    };
  },
  computed: {
    ...mapState(['netWorkError']),
    ...mapState('moduleAnimals/cat', ['originData']),
    chartVisible() {
      return this.chartData.rows.length;
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getListBreeds', 'getFilterBreeds']),
    drawCharts() {
      const len = this.select.length;
      const gt = len > whiteList.max;
      const lt = len < whiteList.min;
      if (gt || lt) {
        const message = gt ? `信息量过大，无法生成图表，最多选择${whiteList.max}个` : '请勾选左侧提供绘图数据';
        const type = gt ? 'error' : 'info';
        this.setGlobalMessage({ message, type });
        return;
      }
      const arr = [];
      this.select.forEach((e) => {
        const obj = _.pick(e, columns);
        arr.push(obj);
      });
      this.chartData.rows = arr;
    },
    initCollapse() {
      const arr = [];
      chart.forEach((e) => {
        const obj = {
          divider: {
            title: `chart&${e.key}`,
          },
          collapse: [{
            title: `${e.key}内容介绍`,
            content: `喵喵${e.label}图，选择数据后点击analysis即可绘制`,
          }],
        };
        arr.push(obj);
      });
      this.chartCollapse = arr;
    },
    searchBreeds() {
      if (!this.search) {
        return;
      }
      this.searchable = true;
      const query = { q: this.search };
      this.getFilterBreeds(query)
        .then((response) => {
          this.searchable = false;
          this.liquidData.rows[0].percent = Big(response.length / this.originData.length)
            .toFixed(2);
        })
        .catch((error) => {
          this.searchable = false;
          const mess = {
            message: error.response.data.message || this.netWorkError.message,
            type: 'error',
          };
          this.setGlobalMessage(mess);
        });
    },
  },
  created() {
    this.getListBreeds()
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
    this.initCollapse();
  },
};
</script>
