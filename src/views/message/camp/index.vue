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
      active: 'today',
      tabs: [
        { key: 'today', label: '今日热读' },
        { key: 'category', label: '闲读百宝囊' },
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
