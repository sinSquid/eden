<template>
  <div id="tp-header">
    <div class="logo"></div>
    <div class="content">
      <div class="network"></div>
      <div class="user">
        <div class="avatar"></div>
        <div class="username"></div>
      </div>
      <div class="sign-out"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tp-header',
  computed: {},
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  #tp-header {
    height: 40px;
    background-color: aqua;
    display: flex;
    flex: auto;
    justify-content: flex-start;
    & > .logo {
      min-width: 100px;
      /*background: url("~@/assets/images/colorful/svg/notepad.svg") no-repeat;*/
      background-size: 40px;
    }
    & > .content {
    }
  }
</style>
