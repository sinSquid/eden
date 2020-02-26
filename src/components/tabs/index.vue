<template>
  <el-tabs v-model="activeTab"
    @tab-click="updateRoute">
    <el-tab-pane v-for="{value, label, path} of tabs"
      :key="value"
      :label="label"
      :name="path" />
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
  watch: {
    '$route.path': {
      deep: true,
      handler(val) {
        if (!val.includes(this.activeTab)) {
          this.chgActiveTab();
        }
      },
    },
  },
  methods: {
    updateRoute() {
      this.$router.push({ path: `${this.activeTab}` })
        .catch(() => {
          // vue-router3.1版本对相同路由的push、replace会报错，暂不处理，等待官方修复
        });
    },
    chgActiveTab() {
      this.activeTab = this.tabs.find((e) => this.$route.path.includes(e.path)).path;
    },
  },
  mounted() {
    this.chgActiveTab();
  },
};
</script>

<style lang="less">
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
</style>
