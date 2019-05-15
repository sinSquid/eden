<template>
  <div class="login-back">
    <div class="login-container">
      <el-form :model="userInfo" ref="loginForm" :rules="ruleValidate"
        label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="warning" :loading="isSignIn"
          :disabled="isSignIn" @click="SignIn">
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { validateUserName, validatePassword } from '@/utils/validator';

export default {
  name: 'tp-login',
  data() {
    return {
      isSignIn: false,
      ruleValidate: {
        username: [
          {
            required: true, type: 'string', trigger: 'blur', message: '请输入账号',
          },
          {
            type: 'string', trigger: 'blur', message: '账号不合法', validator: validateUserName,
          },
        ],
        password: [
          {
            required: true, type: 'string', trigger: 'blur', message: '请输入密码',
          },
          {
            type: 'string', trigger: 'blur', message: '密码不合法', validator: validatePassword,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapActions(['signIn']),
    /**
    * @Description: 登录函数，后期会更换三方网站auth token验证
    * @Author: sinSquid
    * @date: 2019/4/28
    * @Params:  formData
    * @Return: null
    */
    SignIn() {
      this.isSignIn = true;
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          this.isSignIn = false;
          return;
        }
        setTimeout(() => {
          this.isSignIn = false;
          this.signIn(this.userInfo);
        }, 1000);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@_img: '~@/assets/images';
.login-back {
  min-height: 766px;
  position: absolute;
  background: url("@{_img}/bg/bg.svg") 50% no-repeat;
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
