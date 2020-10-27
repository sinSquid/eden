<template>
  <el-row type="flex">
    <el-col
      :span="6">
      <div class="girl-area">
        <div class="desc-content">
          {{girl.desc}}
        </div>
        <swiper
          style="width: 322px"
          ref="girlSwiper"
          class="swiper"
          :options="swiperOptions">
          <swiper-slide
            v-for="url of girl.images"
            class="swiper-slide"
            :key="url">
            <img
              class="girl-img"
              loading="lazy"
              :src="url"
              alt="not found" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" />
        </swiper>
      </div>
      <div class="ui-dis-flex__end ui-mt-10">
        <el-button
          class="ui-mr-20"
          circle
          icon="el-icon-refresh"
          type="primary"
          :disabled="remote"
          @click="getRandomGirl" />
      </div>
    </el-col>
    <el-col :span="9">
      123
    </el-col>
    <el-col :span="9">
      456
    </el-col>
  </el-row>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { getRandomData } from '@/apis/message/gank';
import 'swiper/swiper-bundle.css';


export default {
  name: 'message-camp-home',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      girl: {
        desc: undefined,
        images: [],
      },
      remote: false,
    };
  },
  computed: {
    currentData() {
      return this.results[this.active] || [];
    },
    swiper() {
      return this.$refs.girlSwiper.$swiper;
    },
  },
  methods: {
    getRandomGirl() {
      this.remote = true;
      getRandomData({ category: 'Girl', type: 'Girl', count: 1 })
        .then((res) => {
          const [first] = res.data || [];
          this.girl = first;
        })
        .finally(() => {
          setTimeout(() => {
            this.remote = false;
          }, 3000);
        });
    },
  },
  mounted() {
    this.getRandomGirl();
  },
};
</script>

<style lang="less" scoped>
.girl-area {
  display: flex;
  flex: 1;
  .desc-content {
    height: 480px;
    writing-mode: vertical-lr;
  }
  .girl-img {
    height: 480px;
  }
}
</style>
