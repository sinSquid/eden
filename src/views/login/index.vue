<template>
  <div class="login-container">
    <el-form :model="" ref="loginForm">
      <el-form-item label="账号">
        <el-input v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'tp-login',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
