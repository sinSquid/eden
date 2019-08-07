<template>
  <div>
    <el-table
      height="360"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      max-height="360"
      :data="fda[detailTab].data">
      <el-table-column
        v-for="col of cols"
        :key="col.key"
        :prop="col.key"
        :label="col.label"
        :sortable="col.sort"
        :width="col.width">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="{ row: { report_number } }">
          <el-button
            size="mini"
            type="success"
            @click="checkDetail(report_number)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      class="ui-mt-10"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :layout="layout"
      :total="fda[detailTab].total"
      :page-sizes="pageScale">
    </el-pagination>
    <json-viewer
      :visible.sync="visible"
      :json-data="jsonViewData">
    </json-viewer>
  </div>
</template>

<script>
import {
  mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';
import { detail } from '../../lib/data';
import jsonViewer from '@/components/json-viewer/index.vue';

export default {
  name: 'detail-table',
  components: {
    jsonViewer,
  },
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageScale: [6, 12, 18, 24],
      loading: false,
      visible: false,
      jsonViewData: {},
    };
  },
  computed: {
    ...mapState('moduleHealth/fda', ['fda']),
    ...mapGetters('moduleHealth/fda', ['detailTab']),

    cols() {
      return detail[this.detailTab];
    },
    queryParams() {
      return this.fda[this.detailTab].params;
    },
    pageSize: {
      get() {
        return this.queryParams.limit;
      },
      set(limit) {
        this.setFDAParams({ limit });
        this.innerGetFDAEvent();
      },
    },
    currentPage: {
      get() {
        return this.queryParams.skip + 1;
      },
      set(skip) {
        if (skip === (this.queryParams.skip + 1)) {
          return;
        }
        this.setFDAParams({ skip });
        this.innerGetFDAEvent();
      },
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapMutations('moduleHealth/fda', ['setFDAParams']),
    ...mapActions('moduleHealth/fda', ['getFDAEvent']),

    checkDetail(id) {
      const aims = this.fda[this.detailTab].results;
      const index = aims.findIndex(e => e.report_number === id);
      this.jsonViewData = aims[index];
      this.visible = true;
    },
    innerGetFDAEvent() {
      this.loading = true;
      this.getFDAEvent()
        .catch((error) => {
          const { response: { data: { error: { message } } } } = error;
          this.setGlobalMessage({ message, type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
