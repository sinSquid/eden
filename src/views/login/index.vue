<template>
  <div class="login-back">
    <div class="login-container">
      <el-form :model="userInfo" ref="loginForm" label-width="60px" class="login-form">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'tp-login',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('userInfo', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.login-back {
  background: url("~@/assets/images/background/background.svg") 10% -180px no-repeat;
  background-size: 80%;
  height: 100%;
  .login-container {
    width: 320px;
    height: 240px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(168, 224, 224, 0.6);
    border-radius: 5px;
    .login-form {
      position: absolute;
      width: 300px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
