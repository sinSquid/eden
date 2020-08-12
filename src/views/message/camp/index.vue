<template>
  <el-tabs
    tab-position="left"
    v-model="active"
    @tab-click="updateRoute"
    style="height: auto;">
    <el-tab-pane
      v-for="{ key, label } of tabs"
      :key="key"
      :name="key"
      lazy
      :label="label" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
    updateRoute() {
      this.$router.push({ path: `/message/camp/${this.active}` })
        .catch(() => {
          // vue-router3.1版本对相同路由的push、replace会报错，暂不处理，等待官方修复
        });
    },
  },
};
</script>
