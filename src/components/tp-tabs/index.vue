<template>
  <el-tabs v-model="tabsName"
    @tab-click="updateRoute">
    <el-tab-pane v-for="tab in tpTabs"
      :key="tab.value"
      :label="tab.label"
      :name="tab.value">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'tp-tabs',
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['tpTabs', 'activeTabsName']),

    tabsName: {
      get() {
        return this.activeTabsName;
      },
      set(val) {
        this.setActiveTabsName({ name: val });
      },
    },
  },
  methods: {
    ...mapMutations(['setActiveTabsName']),

    updateRoute() {
      this.$router.push({ path: `${this.activeTabsName}` });
    },
  },
};
</script>

<style lang="less">
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
</style>
