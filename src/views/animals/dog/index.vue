<template>
  <div>
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        expand-trigger="hover"
        :options="cascadeOptions"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
    </div>
    <span>Dog</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ani-dog',
  data() {
    return {
      url: '',
      selectedOptions: [],
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['cascadeOptions']),
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getListBreeds', 'getRandomDog']),

    handleChange() {
      console.log('pika');
    },
  },
  created() {
    this.getListBreeds();
  },
};
</script>

<style scoped>

</style>
