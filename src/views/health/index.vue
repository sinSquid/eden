<template>
  <div class="health">
    <eden-tabs :tabs="heaTabs" />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import moduleHealth from '@/store/modules/health';
import edenTabs from '@/components/tabs/index.vue';
import '@/styles/health/index.less';

const heaTabs = [{
  value: 'doctor',
  label: 'Doctor',
  path: '/health/doctor',
}, {
  value: 'fda',
  label: 'FDA',
  path: '/health/fda',
}];

export default {
  name: 'health',
  components: {
    edenTabs,
  },
  data() {
    return {
      heaTabs,
    };
  },
  created() {
    this.$store.registerModule(moduleHealth.name, moduleHealth);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleHealth.name);
  },
};
</script>
