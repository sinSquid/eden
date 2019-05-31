<template>
  <div id="ani-dog">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <dog-breeds></dog-breeds>
    <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
    <dog-views></dog-views>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dogBreeds from './dogBreeds.vue';
import dogViews from './dogViews.vue';
import dividerCollapse from '@/components/divider-collapse/index.vue';

export default {
  name: 'aniDog',
  data() {
    return {
      dividerCollapse: [{
        divider: {
          title: 'dog&breeds',
        },
        collapse: [{
          title: 'breeds内容介绍',
          content: '获取所有已存在的狗子种类',
          link: 'https://dog.ceo/api/breeds/list/all',
        }],
      }, {
        divider: {
          title: 'dog&views',
        },
        collapse: [{
          title: 'views内容介绍',
          content: '随机抽取一张狗子（选择品种与否）',
          link: 'https://dog.ceo/api/breed/[breed]/images/random',
        }],
      }],
    };
  },
  components: {
    dogBreeds,
    dogViews,
    dividerCollapse,
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getListBreeds']),

  },
  created() {
    this.getListBreeds();
  },
};
</script>
