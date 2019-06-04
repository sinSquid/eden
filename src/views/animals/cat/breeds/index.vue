<template>
  <div class="cat-breeds">
    <el-row type="flex" justify="start" :gutter="20">
      <el-col :span="12" class="table">
        <cat-table :data="originData" :select.sync="select"></cat-table>
      </el-col>
      <el-col :span="12" class="chart">
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
          <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
          <ve-line v-if="chartVisible" :data="chartData"></ve-line>
          <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
          <ve-histogram v-if="chartVisible" :data="chartData"></ve-histogram>
          <divider-collapse :data="dividerCollapse[2]"></divider-collapse>
          <ve-scatter v-if="chartVisible" :data="chartData"></ve-scatter>
          <divider-collapse :data="dividerCollapse[3]"></divider-collapse>
          <ve-radar v-if="chartVisible" :data="chartData"></ve-radar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getTimestamp } from '@/utils/date/extend-dayjs';
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

export default {
  name: 'catBreeds',
  components: {
    dividerCollapse,
    catTable,
  },
  data() {
    return {
      select: [],
      chartData: {
        columns,
        rows: [],
      },
      dividerCollapse: [],
    };
  },
  computed: {
    ...mapState('moduleAnimals/cat', ['originData']),
    chartVisible() {
      return this.chartData.rows.length;
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    drawCharts() {
      if (this.select.length > 10) {
        const timestamp = getTimestamp();
        const mess = { message: '信息量过大，无法生成图表，最多选择10个', type: 'error', timestamp };
        this.setGlobalMessage(mess);
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
      this.dividerCollapse = arr;
    },
  },
  created() {
    this.initCollapse();
  },
};
</script>
