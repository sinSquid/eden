<template>
  <div>
    <dog-breeds></dog-breeds>
    <cascade-view></cascade-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dogBreeds from './dogBreeds.vue';
import cascadeView from './cascadeView.vue';

export default {
  name: 'ani-dog',
  data() {
    return {
    };
  },
  components: {
    dogBreeds,
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
