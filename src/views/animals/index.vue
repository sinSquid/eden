<template>
 <div id="animals">
   <eden-tabs :tabs="aniTabs"></eden-tabs>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
 </div>
</template>

<script>
import moduleAnimals from '@/store/modules/animals';
import edenTabs from '@/components/tabs/index.vue';
import '@/styles/animals/index.less';

const aniTabs = [{
  value: 'dog',
  label: 'dog',
  path: '/animals/dog',
}, {
  value: 'cat',
  label: 'cat',
  path: '/animals/cat',
}];

export default {
  name: 'animals',
  components: {
    edenTabs,
  },
  data() {
    return {
      aniTabs,
    };
  },
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
