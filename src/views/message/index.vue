<template>
  <div>
    <eden-tabs :tabs="heaTabs" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import moduleMess from '@/store/modules/mess';
import edenTabs from '@/components/tabs/index.vue';

const heaTabs = [{
  value: 'camp',
  label: 'camp',
  path: '/message/camp',
}];

export default {
  name: 'message',
  components: {
    edenTabs,
  },
  data() {
    return {
      heaTabs,
    };
  },
  created() {
    this.$store.registerModule(moduleMess.name, moduleMess);
  },
  beforeDestroy() {
    this.$store.unregisterModule(moduleMess.name);
  },
};
</script>
