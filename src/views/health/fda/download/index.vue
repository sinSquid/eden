<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="changeTab">
      <el-tab-pane
        v-for="cg of category"
        :key="cg"
        :label="cg"
        :name="cg">
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      class="ui-dis-flex ui-ml-10 ui-mt-10"
      size="medium"
      @click="innerGetDownList">
      查询下载列表
    </el-button>
    <el-table
      height="480"
      stripe
      size="small"
      border
      show-summary
      :fit="false"
      :summary-method="totalRecord"
      ref="downTable"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      :data="list[activeName]"
      class="down-table">
      <el-table-column
        v-for="col of downCols"
        :key="col.key"
        :prop="col.key"
        :label="col.label"
        :sortable="col.sort"
        :width="col.width">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="{ row: { size_mb, file } }">
          <el-button
            size="mini"
            type="primary"
            @click="downFile(size_mb, file)">
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ui-mt-40"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { downCols } from '../lib/data';

const category = ['food', 'drug', 'device', 'animalandveterinary', 'other'];

export default {
  name: 'down-category',
  data() {
    return {
      activeName: 'food',
      loading: false,
      category,
      downCols,
      list: {
        food: [],
        drug: [],
        device: [],
        animalandveterinary: [],
        other: [],
      },
      List: [],
      step: 20,
    };
  },
  computed: {
    ...mapState('moduleHealth/fda', ['down']),

    currentData() {
      return this.down.results[this.activeName];
    },
    displayList() {
      return this.list[this.activeName];
    },
    noMore() {
      return this.displayList.length >= this.currentData.length;
    },
  },
  methods: {
    ...mapActions('moduleHealth/fda', ['getDownList']),

    loadData() {
      const len = this.currentData.length;
      const now = this.displayList.length;
      if (len === now) { return; }
      this.loading = true;
      setTimeout(() => {
        const end = now < (len - this.step) ? (now + this.step) : len;
        this.list[this.activeName] = _.slice(this.currentData, 0, end);
        this.loading = false;
      }, 1000);
    },
    lazyLoad() {
      const dom = this.$refs.downTable.bodyWrapper;
      const lazy = _.debounce(() => {
        const { clientHeight, scrollHeight, scrollTop } = dom;
        if ((clientHeight + scrollTop) < scrollHeight) { return; }
        this.loadData();
      }, 200);
      dom.addEventListener('scroll', lazy);
    },
    totalRecord() {
      const sums = [];
      const aims = this.currentData;
      for (const col of downCols) {
        if (col.count) {
          let values;
          if (col.key === 'size_mb') {
            values = aims.map((e) => Number(e[col.key]));
          } else {
            values = aims.map((e) => e[col.key]);
          }
          const sum = _.reduce(values, (prev, curr) => prev + curr, 0);
          sums.push(sum);
        } else {
          sums.push('-');
        }
      }
      this.$nextTick(() => {
        // 重绘table布局，解决切换tab时汇总summary-method计算失效
        this.$refs.downTable.doLayout();
      });
      return sums;
    },
    innerGetDownList() {
      this.getDownList()
        .then(() => {
          this.resetList();
          this.initList();
        });
    },
    initList() {
      const len = this.currentData.length;
      const end = (len - this.step) >= 0 ? this.step : len;
      this.list[this.activeName] = _.slice(this.currentData, 0, end);
    },
    resetList() {
      for (const cg of category) {
        this.list[cg] = [];
      }
    },
    changeTab() {
      if (this.displayList.length) { return; }
      this.initList();
      this.$nextTick(() => {
        this.$refs.downTable.bodyWrapper.scrollTop = 0;
      });
    },
    downFile(size, file) {
      if (Number(size) > 10) {
        this.$confirm('此文件大于10M，继续下载将会耗费一定时间与流量，是否继续？', 'query', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-error',
          closeOnClickModal: false,
        })
          .then(() => {
            window.location.href = file;
          })
          .catch(() => {});
      } else {
        window.location.href = file;
      }
    },
  },
  mounted() {
    this.lazyLoad();
  },
};
</script>
<style lang="less">
  .down-table{
    width: 60%;
  }
</style>
