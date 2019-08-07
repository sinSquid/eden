<template>
  <div>
    <summ-bdage></summ-bdage>
    <summ-description v-show="description"></summ-description>
    <summ-detail v-show="!description"></summ-detail>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import summBdage from './summ-bdage.vue';
import summDescription from './summ-description.vue';
import summDetail from './detail/index.vue';

export default {
  name: 'fdaSummary',
  components: {
    summBdage,
    summDescription,
    summDetail,
  },
  computed: {
    ...mapState('moduleHealth/fda', ['activeTab']),

    description() {
      return this.activeTab === 'description';
    },
  },
};
</script>

<style scoped>

</style>
