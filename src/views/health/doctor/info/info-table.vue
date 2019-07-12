<template>
  <el-table
    ref="doctorInfoTable"
    :max-height="640"
    v-loading="loading"
    element-loading-text="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(153, 169, 191, 0.1)"
    stripe
    tooltip-effect="light"
    size="small"
    :data="displayData">
    <el-table-column
      v-for="col in columns"
      :prop="col.key"
      :key="col.key"
      :fixed="col.fixed"
      :sortable="col.sort"
      :label="col.label"
      :width="col.width">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex';

const columns = [
  {
    key: 'npi', label: 'Nppess', width: 120, sort: true, fixed: true,
  },
  { key: 'info', label: 'Info', width: 100 },
  { key: 'operation', label: 'Operation', width: 120 },
];

export default {
  name: 'info-table',
  data() {
    return {
      columns,
      loading: false,
    };
  },
  computed: {
    ...mapState('moduleHealth/doctor', ['origin']),

    displayData() {
      const data = [];
      this.origin.data.forEach((e) => {
        const obj = _.pick(e, ['npi', 'profile']);
        for (const [key, value] of _.toPairs(e)) {
          if (_.isArray(value)) {
            obj[key] = value.length;
          }
        }
        data.push(obj);
      });
      return data;
    },
    totalPage() {
      return this.origin.total;
    },
  },
};
</script>
