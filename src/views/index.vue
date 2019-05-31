<template>
  <el-container>
    <el-header height="40px">
      <tp-header></tp-header>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <tp-side-nav></tp-side-nav>
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
import TpHeader from '@/components/header/index.vue';
import TpSideNav from '@/components/side-nav/index.vue';

export default {
  name: 'takeaway-platform',
  components: {
    TpHeader,
    TpSideNav,
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
