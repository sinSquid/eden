<template>
  <div>
    <span class="demonstration">find dog</span>
    <el-cascader
      expand-trigger="hover"
      :options="cascadeOptions"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'cascadeView',
  data() {
    return {
      selectedOptions: [],
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['cascadeOptions']),
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getRandomDog']),

    handleChange() {
      console.log('pika');
    },
  },
};
</script>

<style scoped>

</style>
