<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import { elLoadingOptions } from '@/lib/element/config';

export default {
  name: 'takeaway-platform',
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
        this.loading = Loading.service(this.globalLoading);
      } else {
        this.loading.close();
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
