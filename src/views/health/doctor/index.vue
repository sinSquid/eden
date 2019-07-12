<template>
  <div>
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <doctor-info></doctor-info>
  </div>
</template>

<script>
import dividerCollapse from '@/components/divider-collapse/index.vue';
import doctorInfo from './info/index.vue';

export default {
  name: 'hea-doctor',
  components: {
    dividerCollapse,
    doctorInfo,
  },
  data() {
    return {
      dividerCollapse: [{
        divider: {
          title: 'cat&breeds',
        },
        collapse: [{
          title: 'breeds内容介绍',
          content: '获取所有喵喵种类',
          link: 'https://docs.thecatapi.com/api-reference/breeds/',
        }],
      }],
    };
  },
};
</script>

<style scoped>

</style>
