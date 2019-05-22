<template>
  <div>
    <breeds-tag></breeds-tag>
    <cascade-view></cascade-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import breedsTag from './breedsTag.vue';
import cascadeView from './cascadeView.vue';

export default {
  name: 'ani-dog',
  data() {
    return {
    };
  },
  components: {
    breedsTag,
    cascadeView,
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getListBreeds']),

  },
  created() {
    this.getListBreeds();
  },
};
</script>

<style scoped>

</style>
