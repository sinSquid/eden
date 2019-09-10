<template>
  <div class="health">
    <eden-tabs :tabs="heaTabs"></eden-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import edenTabs from '@/components/tabs/index.vue';

const heaTabs = [{
  value: 'intro',
  label: 'intro',
  path: '/home/intro',
}, {
  value: 'license',
  label: 'license',
  path: '/home/license',
}];

export default {
  name: 'home',
  components: {
    edenTabs,
  },
  data() {
    return {
      heaTabs,
    };
  },
};
</script>
