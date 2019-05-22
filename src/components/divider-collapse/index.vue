<template>
  <div class="ui-div-coll-wh">
    <el-divider :content-position="data.divider.position || 'left'">
      <i class="el-icon-platform-eleme">{{ data.divider.title }}</i>
    </el-divider>
    <el-collapse accordion class="ui-ml-20">
      <el-collapse-item v-for="col in data.collapse" :key="col.title">
        <template slot="title">
          {{ col.title }}<i class="el-icon-s-promotion"></i>
        </template>
        <div class="ui-ta-l">{{ col.content }}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'divider-collapse',
  props: {
    /* 基于element封装的分割线+折叠面板样式
    样例：{divider:{title:'',position:''},collapse:[{title:'',content:'',}]} */
    data: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.ui-div-coll-wh {
  width: 480px;
}
</style>
