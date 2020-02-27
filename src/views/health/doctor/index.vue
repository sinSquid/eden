<template>
  <div class="heal-doctor">
    <divider-collapse :data="dividerCollapse[0]" />
    <doctor-info />
    <doctor-practice />
  </div>
</template>

<script>
import dividerCollapse from '@/components/divider-collapse/index.vue';
import doctorInfo from './info/index.vue';
import doctorPractice from './practice/index.vue';

export default {
  name: 'hea-doctor',
  components: {
    dividerCollapse,
    doctorInfo,
    doctorPractice,
  },
  data() {
    return {
      dividerCollapse: [{
        divider: {
          title: 'doctor',
        },
        collapse: [{
          title: 'doctor内容介绍',
          content: '获取doctor相关内容',
          link: 'https://developer.betterdoctor.com/documentation15#/',
        }],
      }],
    };
  },
};
</script>

<style scoped>

</style>
