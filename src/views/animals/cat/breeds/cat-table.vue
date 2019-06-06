<template>
  <div class="cat-table">
    <el-table
      ref="catBreedsTable"
      :max-height="720"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.3)"
      stripe
      :fit="false"
      tooltip-effect="light"
      size="small"
      @selection-change="updateSelect"
      :data="data">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column type="expand" width="30">
        <template slot-scope="props">
          <el-form label-position="right" inline class="table-expand">
            <el-form-item
              v-for="ex in expand"
              :key="props.row.id + ex.key"
              :label="ex.label">
              <span>{{ props.row[ex.key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="col in columns"
        :prop="col.key"
        :key="col.key"
        :fixed="col.fixed"
        :sortable="col.sort"
        :label="col.label"
        :width="col.width">
      </el-table-column>
      <el-table-column
        label="描述"
        width="180">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            :content="scope.row.description"
            :width="240"
            popper-class="popover"
            :offset="100"
            :open-delay="200"
            placement="bottom-start">
            <span slot="reference"
              class="text-ellipsis-180 cat-desc">
              {{ scope.row.description }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 表格列
const columns = [
  {
    key: 'name', label: '名称', width: 140, sort: true,
  },
  {
    key: 'origin', label: '产地', width: 80, sort: true,
  },
  { key: 'country_codes', label: '分布地', width: 60 },
  { key: 'life_span', label: '寿命(Y)', width: 80 },
  { key: 'temperament', label: '特点', width: 180 },
];
// expand特性枚举
const expand = [
  { key: 'experimental', label: '实验的' },
  { key: 'hairless', label: '无毛的' },
  { key: 'natural', label: '自然的' },
  { key: 'rare', label: '罕见的' },
  { key: 'rex', label: '雷克斯' },
  { key: 'suppressed_tail', label: '翘尾的' },
  { key: 'short_legs', label: '短腿的' },
  { key: 'hypoallergenic', label: '防过敏的' },
];
export default {
  name: 'catTable',
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    select: {
      required: true,
      type: Array,
      default: () => [],
    },
    loading: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns,
      expand,
    };
  },
  methods: {
    updateSelect(val) {
      this.$emit('update:select', val);
    },
  },
};
</script>

<style lang="less">
  .cat-table {
    .table-expand {
      font-size: 12px;
    }
    .table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .table-expand .el-form-item {
      margin: 0;
      width: 50%;
    }
  }
  .popover {
    color: black;
  }
  .cat-desc {
    cursor: pointer;
  }
</style>
