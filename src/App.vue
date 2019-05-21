<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'takeaway-platform',
  computed: {
    ...mapState(['globalMessage']),
    timestamp() {
      return this.globalMessage.timestamp;
    },
  },
  watch: {
    /**
    * @Description: 监控全局message通知，禁止在使用的地方this.$message，
     * 使用commit提交修改globalMessage
    * @Author: sinSquid
    * @date: 2019/4/29
    * @Params: message
    * @Return: null
    */
    timestamp() {
      const options = _.cloneDeep(this.globalMessage);
      this.$message(options);
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
