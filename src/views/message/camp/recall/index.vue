<template>
  <div class="ui-ml-10">
    <div :class="['ui-dis-flex__center', 'ui-mb-10']">
      <el-date-picker
        v-model="date"
        type="date"
        :picker-options="pickerOptions"
        :clearable="false"
        @change="getToday"
        placeholder="选择日期">
      </el-date-picker>
      <el-radio-group
        class="ui-ml-20"
        v-model="active">
        <el-radio
          v-for="cg of category"
          :key="cg"
          :label="cg">
          {{ cg }}
        </el-radio>
      </el-radio-group>
    </div>
    <el-table
      max-height="640"
      stripe
      border
      :fit="false"
      ref="todayTable"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      :data="currentData">
      <el-table-column
        v-for="{ key, label, width } of todayCols"
        :key="key"
        :prop="key"
        :label="label"
        :width="width">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="{ row: { url, forbidJump } }">
          <el-button
            type="primary"
            :disabled="forbidJump"
            @click="jumpSource(url)">
            jump
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, getMilliSecond } from '@/utils/date/dayjs';
import { getDay } from '@/apis/message/gank';
import { todayCols } from '../lib/data';

const lastUpdateDate = new Date('2016-12-23'); // 最后数据追踪日期

export default {
  name: 'recall',
  data() {
    return {
      date: lastUpdateDate,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > getMilliSecond('2016-12-23');
        },
      },
      active: null,
      loading: false,
      todayCols,
      category: [],
      results: {},
      pictureSuffix: ['.bmp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ai', '.webp'],
    };
  },
  computed: {
    currentData() {
      return this.results[this.active] || [];
    },
  },
  methods: {
    getToday() {
      const date = this.date || lastUpdateDate;
      getDay(formatDate('YYYY/MM/DD', date))
        .then((data) => {
          const { error, results, category } = data;
          if (!error) {
            for (const item of Object.values(results)) {
              item.forEach((e) => {
                e.forbidJump = this.pictureSuffix.some((sf) => e.url.includes(sf));
              });
            }
            if (category && Array.isArray(category) && !category.includes(this.active)) {
              const [first] = category;
              this.active = first;
            }
            this.results = results;
            this.category = category;
          }
        });
    },
    jumpSource(url) {
      this.$confirm('您将跳至资源原始网页？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-error',
        closeOnClickModal: false,
        type: 'success',
      })
        .then(() => {
          window.open(url, 'target');
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getToday();
  },
};
</script>
<style lang="less">
  .down-table{
    width: 60%;
  }
</style>
