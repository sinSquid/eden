<template>
  <div>user</div>
</template>

<script>
import moduleUser from '@/store/modules/user';

export default {
  name: 'user',
  // 在每个模块的入口视图动态注册对应的 store
  created() {
    this.$store.registerModule(moduleUser.name, moduleUser);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleUser.name);
  },
};
</script>

<style scoped>

</style>
