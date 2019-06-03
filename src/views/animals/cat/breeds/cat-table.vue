<template>
  <div class="cat-table">
    <el-table
      ref="catBreedsTable"
      :max-height="600"
      stripe
      :fit="false"
      tooltip-effect="light"
      size="small"
      style="min-width: 600px;"
      :data="data">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.experimental }}</span>
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
            :width="200"
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
    key: 'name', label: '名称', width: 140, sort: true, fixed: true,
  },
  {
    key: 'origin', label: '产地', width: 80, sort: true,
  },
  { key: 'country_codes', label: '分布地', width: 60 },
  { key: 'life_span', label: '寿命(Y)', width: 80 },
  { key: 'temperament', label: '特点', width: 180 },
];
// expand
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
  name: 'cat-table',
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns,
      expand,
    };
  },
};
</script>

<style lang="less">
  .cat-table {
    .table-expand {
      font-size: 0;
    }
    .table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .popover {
    color: rgba(255, 108, 2, 0.8);
  }
  .cat-desc {
    cursor: pointer;
  }
</style>
