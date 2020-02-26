<template>
  <div class="ui-ml-10">
    <div class="ui-dis-flex__center ui-mt-10 ui-mb-20">
      <el-radio-group
        v-model="active"
        @change="changeTab">
        <el-radio
          v-for="cg of category"
          :key="cg"
          :label="cg">
          {{ cg }}
        </el-radio>
      </el-radio-group>
      <el-button
        type="warning"
        icon="el-icon-search"
        class="ui-ml-20"
        size="mini"
        @click="getToday"
        circle>
      </el-button>
    </div>
    <el-table
      max-height="640"
      stripe
      size="small"
      border
      :fit="false"
      ref="todayTable"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      :data="list[active]">
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
            size="mini"
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
import api from '@/store/modules/mess/camp/api';
import { todayCols } from '../lib/data';

export default {
  name: 'today',
  data() {
    return {
      active: 'Android',
      loading: false,
      todayCols,
      list: {
        Android: [],
        App: [],
        iOS: [],
        休息视频: [],
        前端: [],
        拓展资源: [],
        瞎推荐: [],
        福利: [],
      },
      step: 20,
      category: ['Android', 'App', 'iOS', '休息视频', '前端', '拓展资源', '瞎推荐', '福利'],
      results: {},
      pictureSuffix: ['.bmp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ai', '.webp'],
    };
  },
  computed: {
    currentData() {
      return this.results[this.active] || [];
    },
    displayList() {
      return this.list[this.active];
    },
    noMore() {
      return this.displayList.length >= this.currentData.length;
    },
  },
  methods: {
    async getToday() {
      const result = await api.getToday();
      const { status, message, data: { error, results } } = result;
      if (status === 200 && !error) {
        for (const [, data] of _.toPairs(results)) {
          data.forEach((e) => {
            e.forbidJump = this.pictureSuffix.some((sf) => e.url.includes(sf));
          });
        }
        this.results = results;
        this.initList();
      } else {
        this.$Message.error(message || 'something is wrong');
      }
    },
    loadData() {
      const len = this.currentData.length;
      const now = this.displayList.length;
      if (len === now) { return; }
      this.loading = true;
      setTimeout(() => {
        const end = now < (len - this.step) ? (now + this.step) : len;
        this.list[this.active] = _.slice(this.currentData, 0, end);
        this.loading = false;
      }, 1000);
    },
    lazyLoad() {
      const dom = this.$refs.todayTable.bodyWrapper;
      const lazy = _.debounce(() => {
        const { clientHeight, scrollHeight, scrollTop } = dom;
        if ((clientHeight + scrollTop) < scrollHeight) { return; }
        this.loadData();
      }, 200);
      dom.addEventListener('scroll', lazy);
    },
    initList() {
      const len = this.currentData.length;
      const end = (len - this.step) >= 0 ? this.step : len;
      this.list[this.active] = _.slice(this.currentData, 0, end);
    },
    changeTab() {
      if (this.displayList.length) { return; }
      this.initList();
      this.$nextTick(() => {
        this.$refs.todayTable.bodyWrapper.scrollTop = 0;
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
    this.lazyLoad();
  },
};
</script>
<style lang="less">
  .down-table{
    width: 60%;
  }
</style>
