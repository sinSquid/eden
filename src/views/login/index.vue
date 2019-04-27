<template>
  <div class="login-back">
    <div class="login-container">
      <el-form :model="userInfo" ref="loginForm" :rules="ruleValidate"
        label-width="60px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="warning" loading="true">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutatios } from 'vuex';
import { validateUserName, validatePassword } from '@/utils/validator';

export default {
  name: 'tp-login',
  data() {
    return {
      ruleValidate: {
        username: [
          {required: true, type: 'string', trigger: 'blur', validator: }
        ],
        password: [],
      },
    };
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'existStaff']),
  },
  methods: {
    ...mapMutatios(['setGlobalMessage']),
    ...mapMutatios('userInfo', ['setUserInfo']),
    signIn() {
      if (this.existStaff.map(e => e.user).indexOf(this.userInfo.username)) {
        const fund = this.existStaff.filter(e => e.username === this.userInfo.username);
        if (fund.length > 0) {
          this.$router.push({ path: '/' });
        } else {
          this.setGlobalMessage({ message: '密码错误', type: 'error' });
        }
      } else {
        this.setGlobalMessage({ message: '账号不存在', type: 'error' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-back {
  position: absolute;
  background: url("~@/assets/images/background/background.svg") 50% no-repeat;
  background-size: 100%;
  height: 100%;
  width: 100%;
  .login-container {
    width: 360px;
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
