<template>
  <router-view />
</template>

<script>
import moduleAnimals from '@/store/modules/animals';
import '@/styles/animals/index.less';

export default {
  name: 'animals',
  /* 在每个模块的入口视图动态注册对应的 store
  * 目前在beforeCreate钩子内注册module无效、暂时使用created，日后更改
  * date: 20/5/1029
  */
  created() {
    this.$store.registerModule(moduleAnimals.name, moduleAnimals);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleAnimals.name);
  },
};
</script>
