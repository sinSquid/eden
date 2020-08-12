<template>
  <div v-swiper:Swiper="swiperOption">
    <div class="swiper-wrapper">
      <div
        v-for="{ image } of banners"
        class="swiper-slide"
        :key="image">
        <img :src="image" alt="not found" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import { getBanners } from '@/apis/message/gank';
import 'swiper/swiper-bundle.css';

export default {
  name: 'home',
  // 指令模式
  directives: {
    swiper: directive,
  },
  data() {
    return {
      banners: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
    };
  },
  computed: {
    currentData() {
      return this.results[this.active] || [];
    },
  },
  methods: {
    showBanners() {
      getBanners()
        .then(({ data }) => {
          this.banners = data || [];
          if (data && Array.isArray(data) && data.length) {
            this.Swiper.slideTo(1, 1000, false);
          }
        });
    },
  },
  mounted() {
    this.showBanners();
  },
};
</script>
