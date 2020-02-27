<template>
  <div class="http404-container">
    <div class="mess-404">
      <el-button
        icon="el-icon-back"
        type="text"
        @click="goBack">
        返回上一页
      </el-button>
    </div>
    <div class="pic-404" />
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
    margin-top: 100px;
  }
}
</style>
