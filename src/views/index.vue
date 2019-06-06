<template>
  <el-container>
    <el-header height="40px">
      <eden-header></eden-header>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <eden-side-nav></eden-side-nav>
      </el-aside>
      <el-container>
        <el-main class="container-shell ui-bar">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import edenHeader from '@/components/header/index.vue';
import edenSideNav from '@/components/side-nav/index.vue';

export default {
  name: 'eden',
  components: {
    edenHeader,
    edenSideNav,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
  .el-header {
    padding: 0;
  }
  .container-shell {
    max-height: 940px;
    overflow-y: auto;
  }
</style>
