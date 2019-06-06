<template>
  <div id="ani-cat">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <cat-breeds></cat-breeds>
    <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
    <cat-votes></cat-votes>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dividerCollapse from '@/components/divider-collapse/index.vue';
import catBreeds from './breeds/index.vue';
import catVotes from './votes/index.vue';

export default {
  name: 'aniCat',
  components: {
    catBreeds,
    dividerCollapse,
    catVotes,
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
          link: 'https://docs.thecatapi.com/api-reference/breeds/',
        }],
      }, {
        divider: {
          title: 'cat&votes',
        },
        collapse: [{
          title: 'votes内容介绍',
          content: '操作所用账户关于喵喵的投票行为',
          link: 'https://docs.thecatapi.com/api-reference/votes/',
        }],
      }],
    };
  },
  methods: {
    ...mapActions('moduleAnimals/cat', ['getFilterBreeds']),
  },
};
</script>

<style scoped>

</style>
