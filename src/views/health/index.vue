<template>
  <div class="health">
    <eden-tabs :tabs="heaTabs"></eden-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import moduleHealth from '@/store/modules/health';
import edenTabs from '@/components/tabs/index.vue';
import '@/styles/health/index.less';

const heaTabs = [{
  value: 'doctor',
  label: 'doctor',
  path: '/health/doctor',
}, {
  value: 'clinical',
  label: 'clinical',
  path: '/health/clinical',
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
