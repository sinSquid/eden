<template>
  <div>
    <el-table
      ref="doctorInfoTable"
      :height="480"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      stripe
      tooltip-effect="light"
      size="small"
      :data="displayData">
      <el-table-column
        v-for="{key, fixed, sort, label, width} of columns"
        :prop="key"
        :key="key"
        :fixed="fixed"
        :sortable="sort"
        :label="label"
        :width="width">
      </el-table-column>
      <el-table-column
        label="Info"
        width="100">
        <template slot-scope="{ row: { profile: { gender }, uid } }">
          <i :class="['cus-icon-16', gender === 'male' ? 'el-icon-male' : 'el-icon-female']"
            @click="innerSetDetail(uid)">
          </i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :layout="layout"
      :total="totalPage"
      :page-sizes="pageScale">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

const columns = [
  {
    key: 'npi', label: 'Nppess', width: 120, sort: true, fixed: true,
  },
  { key: 'name', label: 'Name', width: 160 },
];

export default {
  name: 'info-table',
  data() {
    return {
      columns,
      loading: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      pageScale: [10, 20, 30, 40],
    };
  },
  computed: {
    ...mapState('moduleHealth/doctor', ['origin', 'doctor', 'limits', 'detail']),

    displayData() {
      const data = [];
      for (const source of this.origin.data) {
        const obj = _.pick(source, ['uid', 'npi', 'profile']);
        obj.name = source.profile.slug;
        data.push(obj);
      }
      return data;
    },
    totalPage() {
      return this.origin.total;
    },
    pageSize: {
      get() {
        return this.doctor.limit;
      },
      set(limit) {
        this.setDoctor({ limit });
        this.innerSearchDoctors();
      },
    },
    currentPage: {
      get() {
        return this.doctor.skip;
      },
      set(skip) {
        if (skip === this.doctor.skip) {
          return;
        }
        this.setDoctor({ skip });
        this.innerSearchDoctors();
      },
    },
  },
  methods: {
    ...mapMutations('moduleHealth/doctor', ['setDoctor', 'setDetail']),
    ...mapActions('moduleHealth/doctor', ['searchDoctors']),

    innerSearchDoctors() {
      this.loading = true;
      this.searchDoctors()
        .finally(() => {
          this.loading = false;
        });
    },
    innerSetDetail(id) {
      const index = this.origin.data.findIndex((e) => e.uid === id);
      const detail = _.pick(this.origin.data[index], _.keys(this.detail));
      this.setDetail(detail);
    },
  },
};
</script>
