<template>
  <div id="ani-cat">
    <cat-breeds></cat-breeds>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import catBreeds from './breeds/index.vue';

export default {
  name: 'ani-cat',
  components: {
    catBreeds,
  },
  methods: {
    ...mapActions('moduleAnimals/cat', ['getFilterBreeds', 'getListBreeds']),
  },
  mounted() {
    this.getListBreeds();
  },
};
</script>

<style scoped>

</style>
