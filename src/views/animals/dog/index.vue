<template>
  <div>
    <span>Dog</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ani-dog',
  data() {
    return {
      url: '',
    };
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getListBreeds', 'getRandomDog']),

  },
  created() {
    this.getListBreeds();
    /* this.getListBreeds().then(({ status, message }) => {
      if (status === 'success') {
        commit
      }
    }).catch(() => {
      this.setGlobalMessage();
    }); */
  },
};
</script>

<style scoped>

</style>
