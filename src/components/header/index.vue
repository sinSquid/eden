<template>
  <div class="eden-header">
    <div class="logo"></div>
    <div class="content">
      <div class="network"></div>
      <div class="user">
        <div class="avatar"></div>
        <div class="username">
          <span>temo</span>
        </div>
      </div>
      <div class="sign-out"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eden-header',
  computed: {},
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
  @_logo:'~@/assets/images/logos';
  .eden-header {
    position: fixed;
    width: 100%;
    height: 40px;
    background-color: #dcdcdc;
    display: flex;
    flex: auto;
    justify-content: flex-end;
    z-index: 1;
    .logo {
      width: inherit;
      height: 40px;
      margin-left: 24px;
      background: url("@{_logo}/vimeo.svg") no-repeat;
      background-size: 40px;
    }
    .content {
      width: 320px;
      max-width: 320px;
      margin-right: 10px;
      display: flex;
      flex: auto;
      .network {
        width: 40px;
        background: url("@{_logo}/deviantart.svg") no-repeat;
        background-size: 40px;
      }
      .user {
        margin-left: 10px;
        width: 100px;
        display: flex;
        .avatar {
          width: 40px;
          background: url("@{_logo}/vine.svg") no-repeat;
          background-size: 40px;
        }
        .username {
          margin-left: 10px;
          position: relative;
          span {
            position:absolute;
            bottom:0;
            padding:0;
            margin:0;
          }
        }
      }
    }
  }
</style>
