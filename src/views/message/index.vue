<template>
  <router-view />
</template>

<script>
import moduleMess from '@/store/modules/mess';

export default {
  name: 'message',
  created() {
    this.$store.registerModule(moduleMess.name, moduleMess);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleMess.name);
  },
};
</script>
