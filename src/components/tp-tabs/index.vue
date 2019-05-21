<template>
  <el-tabs v-model="activeTab"
    @tab-click="updateRoute">
    <el-tab-pane v-for="tab in tpTabs"
      :key="tab.value"
      :label="tab.label"
      :name="tab.value">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'tp-tabs',
  props: {
    tpTabs: {
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
      this.$router.push({ path: `${this.activeTab}` });
    },
  },
  mounted() {
    this.activeTab = this.tpTabs.find(e => e.path === this.$route.path).value;
  },
};
</script>

<style lang="less">
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
</style>
