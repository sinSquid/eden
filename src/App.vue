<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      loading: '',
    };
  },
  computed: {
    ...mapState(['globalMessage', 'globalLoading']),
    messTimestamp() { // 全局通知时间戳
      return this.globalMessage.timestamp;
    },
    loadingShow() {
      return this.globalLoading.loading;
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
    messTimestamp() {
      const options = _.cloneDeep(this.globalMessage);
      this.$message(options);
    },
    loadingShow(val) {
      if (val) {
        this.loading = this.$loading(this.globalLoading);
      } else {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          this.loading.close();
        });
      }
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
