<template>
  <div class="heal-fda">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <fda-summary></fda-summary>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dividerCollapse from '@/components/divider-collapse/index.vue';
import fdaSummary from './summary/index.vue';

export default {
  name: 'heaFDA',
  components: {
    dividerCollapse,
    fdaSummary,
  },
  data() {
    return {
      dividerCollapse: [{
        divider: {
          title: 'fda&summary',
        },
        collapse: [{
          title: 'fda内容介绍',
          content: '美国食药品安全管理',
          link: 'https://open.fda.gov/apis/',
        }],
      }],
    };
  },
  methods: {
    ...mapActions('moduleHealth/fda', ['getFDAEvent']),
  },
  created() {
    this.getFDAEvent('drug');
    this.getFDAEvent('food');
  },
};
</script>
