<template>
  <el-tabs v-model="activeTab"
    @tab-click="updateRoute">
    <el-tab-pane v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :name="tab.value">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeTab: '',
    };
  },
  methods: {
    updateRoute() {
      this.$router.push({ path: `${this.activeTab}` })
        .catch(() => {
          // vue-router3.1版本对相同路由的push、replace会报错，暂不处理，等待官方修复
        });
    },
  },
  mounted() {
    this.activeTab = this.tabs.find(e => e.path === this.$route.path).value;
  },
};
</script>

<style lang="less">
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
</style>
