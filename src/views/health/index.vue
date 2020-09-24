<template>
  <router-view />
</template>

<script>
import moduleHealth from '@/store/modules/health';
import '@/styles/health/index.less';

export default {
  name: 'health',
  created() {
    this.$store.registerModule(moduleHealth.name, moduleHealth);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleHealth.name);
  },
};
</script>
