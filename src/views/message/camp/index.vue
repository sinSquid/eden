<template>
  <el-tabs
    tab-position="left"
    v-model="active"
    style="height: auto;">
    <el-tab-pane
      v-for="{ key, label } of tabs"
      :key="key"
      :name="key"
      lazy
      :label="label" />
  </el-tabs>
</template>

<script>

export default {
  name: 'camp',
  data() {
    return {
      listVisible: false,
      active: 'home',
      tabs: [
        { key: 'home', label: '主页' },
        { key: 'recall', label: '回忆' },
        { key: 'category', label: '闲读百宝囊' },
        { key: 'welfare', label: '福利' },
      ],
    };
  },
  methods: {
    openList() {
      this.listVisible = true;
    },
  },
};
</script>
