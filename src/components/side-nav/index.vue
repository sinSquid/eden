<template>
  <div id="tp-side-nav">
    <el-menu
      default-active="home">
      <template v-for="item in NavList">
        <el-menu-item :key="item.value" :index="item.value">
          <i class="el-icon-menu"></i>
          <router-link :to="item.url">{{ item.label }}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { NavList } from '@/lib/config/Navigation.js';

export default {
  name: 'tp-side-nav',
  data() {
    return {
      NavList,
    };
  },
};
</script>

<style lang="less">
  #tp-side-nav {
    background-color: silver;
    width: 150px;
    position: fixed;
    margin-top: 40px;
    .el-menu-item {
      display: -webkit-box;
      a {
        text-decoration: none;
      }
    }
  }
</style>
