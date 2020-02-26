<template>
  <div class="ui-ml-20 ui-mr-20">
    <el-tag
      v-for="eb in displayTags"
      :key="eb.value"
      :type="eb.type"
      class="ui-mr-10 ui-mb-10">
      {{ eb.value }}
    </el-tag>
    <el-divider content-position="right">charts</el-divider>
    <el-row type="flex" justify="start">
      <el-col :span="4">
        <el-button
          type="warning"
          size="small"
          icon="el-icon-refresh"
          @click="changeType">
          change charts
        </el-button>
      </el-col>
    </el-row>
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { elTagTypes } from '@/lib/element/config';

const chartTypes = ['line', 'histogram', 'pie'];

export default {
  name: 'dogBreeds',
  data() {
    return {
      chartTypes,
      chartSettings: { type: 'line' },
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['originBreeds']),

    displayTags() {
      const tags = [];
      const origin = this.originBreeds;
      _.keys(origin).forEach((key) => {
        const index = Math.floor(key.codePointAt(key.length - 1) % 5);
        tags.push({
          type: elTagTypes[index],
          value: key,
        });
      });
      return tags;
    },
    chartData() {
      const data = {
        columns: ['breed', 'volume'],
        rows: [],
      };
      const aims = this.originBreeds;
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
      const index = chartTypes.findIndex((e) => e === this.chartSettings.type);
      this.chartSettings = { type: chartTypes[(index + 1) % 3] };
    },
  },
};
</script>
