<template>
  <el-container>
    <el-header height="40px">
      <eden-header />
    </el-header>
    <el-container>
      <el-aside width="150px">
        <eden-side-nav />
      </el-aside>
      <el-container>
        <el-main class="container-shell ui-bar">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import edenHeader from '@/components/header/index.vue';
import edenSideNav from '@/components/side-nav/index.vue';
import { store } from '@/lib/store/forage';
import { getUserToken } from '@/lib/store/cookie';

export default {
  name: 'eden',
  components: {
    edenHeader,
    edenSideNav,
  },
  data() {
    return {};
  },
  // vuex内userInfo持久化
  beforeCreate() {
    const vuex = this.$store;
    const token = getUserToken();
    store.getItem(token)
      .then((value) => {
        if (value) {
          vuex.commit('setUserInfo', value);
        } else {
          vuex.commit('setGlobalMessage', { message: 'userinfo is null', type: 'error' });
        }
      })
      .catch(({ message }) => {
        vuex.commit('setGlobalMessage', { message, type: 'error' });
      });
  },
};
</script>

<style lang="less">
  .el-header {
    padding: 0;
  }
  .container-shell {
    max-height: 940px;
    overflow-y: auto;
  }
</style>
