<template>
  <el-row type="flex">
    <el-col :span="8">
      <swiper
        ref="bannerSwiper"
        class="swiper"
        :options="swiperOptions">
        <swiper-slide
          v-for="banner of banners"
          class="swiper-slide"
          :key="banner.image">
          <img
            class="banner-area"
            :src="banner.image"
            alt="not found" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" />
        <div class="swiper-button-prev" slot="button-prev" @click="slideMove('Prev')" />
        <div class="swiper-button-next" slot="button-next" @click="slideMove('Next')" />
      </swiper>
    </el-col>
    <el-col :span="16">
      456
    </el-col>
  </el-row>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { getBanners } from '@/apis/message/gank';
import 'swiper/swiper-bundle.css';


export default {
  name: 'message-camp-home',
  title: 'what',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      banners: [],
      swiperOptions: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  computed: {
    currentData() {
      return this.results[this.active] || [];
    },
    swiper() {
      return this.$refs.bannerSwiper.$swiper;
    },
  },
  methods: {
    showBanners() {
      getBanners()
        .then(({ data }) => {
          this.banners = data || [];
        });
    },
    slideMove(action) {
      this.swiper[`slide${action}`]();
    },
  },
  mounted() {
    this.showBanners();
  },
};
</script>

<style lang="less" scoped>
.banner-area {
  height: 200px;
}
</style>
