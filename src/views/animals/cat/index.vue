<template>
  <div id="ani-cat">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <cat-breeds></cat-breeds>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dividerCollapse from '@/components/divider-collapse/index.vue';
import catBreeds from './breeds/index.vue';

export default {
  name: 'ani-cat',
  components: {
    catBreeds,
    dividerCollapse,
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
          link: 'https://api.thecatapi.com/v1/breeds',
        }],
      }],
    };
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
