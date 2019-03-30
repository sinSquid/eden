<template>
  <el-tabs v-model="activeTabsName" @tab-click="handleClick">
    <el-tab-pane v-for="tab in tpTabs" :key="tab.value" :label="tab.label" :name="tab.value">
      {{ tab.label }}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'tp-tabs',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['tpTabs', 'activeTabsName'])
  },
  methods: {
    ...mapMutations(['setActiveTabsName']),

    handleClick (tab) {
      this.setActiveTabsName({ name: tab })
    }
  }
}
</script>

<style scoped>

</style>
