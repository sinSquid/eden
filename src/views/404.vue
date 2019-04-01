<template>
  <div class="http404-container">
    <div class="pic-404">
      <div></div>
    </div>
    <div class="mess-404">
      <a>返回首页</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-404'
}
</script>

<style lang="less" scoped>
.http404-container {
  height: 100%;
  .pic-404 {
    height: 360px;
    width: 480px;
    background: url('~@/assets/images/404.svg') no-repeat;
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
    a {
      cursor: pointer;
      font-style: italic;
      font-size: 18px;
      color: #f37c26;
      margin-top: 40px;
    }
  }
}
</style>
