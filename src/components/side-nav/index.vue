<template>
  <div class="eden-side-nav">
    <el-menu
      :default-active="defaultMenu">
      <template v-for="item in NavList">
        <router-link :to="item.url" :key="item.value">
          <el-menu-item :index="item.value">
            <i class="el-icon-menu"></i>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mainRoute, NavList } from '@/lib/config/Navigation';

export default {
  name: 'eden-side-nav',
  data() {
    return {
      NavList,
    };
  },
  computed: {
    defaultMenu() {
      const { path } = this.$route;
      return mainRoute.find((e) => path.includes(e.value)).value;
    },
  },
};
</script>

<style lang="less">
  .eden-side-nav {
    background-color: silver;
    width: 150px;
    position: fixed;
    .el-menu-item {
      display: -webkit-box;
    }
  }
</style>
