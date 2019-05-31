<template>
  <div id="ani-dog">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <dog-breeds></dog-breeds>
    <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
    <dog-views></dog-views>
    <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
    <dog-photos></dog-photos>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dividerCollapse from '@/components/divider-collapse/index.vue';
import dogBreeds from './dogBreeds.vue';
import dogViews from './dogViews.vue';
import dogPhotos from './dogPhotos.vue';

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
      }, {
        divider: {
          title: 'dog&photos',
        },
        collapse: [{
          title: 'photos内容介绍',
          content: '随机抽取N张狗子（1~50）',
          link: 'https://dog.ceo/api/breeds/image/random/{volume}',
        }],
      }],
    };
  },
  components: {
    dogBreeds,
    dogViews,
    dogPhotos,
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
