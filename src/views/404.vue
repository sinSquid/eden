<template>
  <div class="http404-container">
    <div class="pic-404">
      <div></div>
    </div>
    <div class="mess-404">
      <el-button
        class="ui-mt-40"
        icon="el-icon-top-left"
        type="text"
        @click="goBack">
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-404',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@image: '~@/assets/images';
.http404-container {
  height: 100%;
  .pic-404 {
    height: 360px;
    width: 480px;
    background: url("@{image}/404.svg") no-repeat;
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .mess-404 {
    display: flex;
    flex: auto;
    justify-content: center;
  }
}
</style>
