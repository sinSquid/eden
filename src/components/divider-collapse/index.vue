<template>
  <div>
    <el-divider :content-position="data.divider.position || 'left'">
      <i class="el-icon-platform-eleme">{{ data.divider.title }}</i>
    </el-divider>
    <el-collapse accordion class="ui-ml-20 ui-div-coll-wh">
      <el-collapse-item v-for="col in data.collapse" :key="col.title">
        <template slot="title">
          {{ col.title }}<i class="el-icon-s-promotion"></i>
        </template>
        <div class="ui-ta-l">{{ col.content }}</div>
        <div class="ui-ta-l" v-if="col.link">
          <el-link
            type="warning"
            :href="col.link"
            target="_blank"
            icon="el-icon-paperclip">
            {{ `${col.link}` }}
          </el-link>
        </div>
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
  border: 1px solid #EBEEF5;
  border-radius: 5px;
  padding-left: 10px;
}
</style>
