<template>
  <div class="ui-ml-20 ui-mr-20">
    <divider-collapse :data="dividerCollapse">
    </divider-collapse>
    <el-tag
      v-for="eb in displayTags"
      :key="eb.value"
      :type="eb.type"
      class="ui-mr-10 ui-mb-10">
      {{ eb.value }}
    </el-tag>
    <el-divider content-position="right">charts</el-divider>
    <el-divider content-position="left">
      <el-button
        type="warning"
        size="small"
        icon="el-icon-refresh"
        @click="changeType">
        change charts
      </el-button>
    </el-divider>
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { tagTypes } from '@/lib/element/config';
import dividerCollapse from '@/components/divider-collapse/index.vue';

const chartTypes = ['line', 'histogram', 'pie'];

export default {
  name: 'dogBreeds',
  components: {
    dividerCollapse,
  },
  data() {
    return {
      chartTypes,
      dividerCollapse: {
        divider: {
          title: 'color tag',
        },
        collapse: [{
          title: 'tag内容介绍',
          content: '此处包含https://dog.ceo/dog-api/已存在dog的种类',
        }],
      },
      chartSettings: { type: 'line' },
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['breeds', 'existBreeds']),

    displayTags() {
      const tags = [];
      this.existBreeds.forEach((e) => {
        const index = Math.floor(e.codePointAt(e.length - 1) % 5);
        tags.push({
          type: tagTypes[index],
          value: e,
        });
      });
      return tags;
    },
    chartData() {
      const data = {
        columns: ['breed', 'volume'],
        rows: [],
      };
      const aims = this.breeds;
      _.keys(aims).forEach((key) => {
        const len = aims[key].length;
        if (len) {
          data.rows.push({ breed: key, volume: len });
        }
      });
      return data;
    },
  },
  methods: {
    changeType() {
      const index = chartTypes.findIndex(e => e === this.chartSettings.type);
      this.chartSettings = { type: chartTypes[(index + 1) % 3] };
    },
  },
};
</script>

<style scoped>

</style>
