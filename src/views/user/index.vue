<template>
  <div>
    <eden-tabs :tabs="heaTabs" />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import moduleUser from '@/store/modules/user';
import edenTabs from '@/components/tabs/index.vue';

const heaTabs = [{
  value: 'me',
  label: 'me',
  path: '/user/me',
}, {
  value: 'more',
  label: 'more',
  path: '/user/more',
}];


export default {
  name: 'user',
  components: {
    edenTabs,
  },
  data() {
    return {
      heaTabs,
    };
  },
  // 在每个模块的入口视图动态注册对应的 store
  created() {
    this.$store.registerModule(moduleUser.name, moduleUser);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleUser.name);
  },
};
</script>
