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
            <el-image
              class="girl-img"
              lazy
              :src="url"
              alt="not found">
              <div slot="error">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
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
    <el-col
      class="week-hot"
      :span="12">
      <div class="ui-dis-flex">
        <el-radio-group
          @change="getWeekHot"
          v-model="week.hotType">
          <el-radio
            v-for="{ key, label } of hotType"
            :key="key"
            :label="key">
            {{`${key}${label}`}}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="ui-dis-flex">
        <el-radio-group
          @change="getWeekHot"
          v-model="week.category ">
          <el-radio
            v-for="category of hotCategory"
            :key="category"
            :label="category" />
        </el-radio-group>
      </div>
      <el-table
        :data="hotWeekData"
        tooltip-effect="dark"
        max-height="480px"
        style="width: 100%;">
        <el-table-column
          v-for="{key, label, width, ellipsis} of hotWeekColumns"
          :key="key"
          :prop="key"
          :label="label"
          :width="width"
          :show-overflow-tooltip="ellipsis"
        />
        <el-table-column
          label="查看详情"
          fixed="right"
          width="120">
          <template slot-scope="{ row }">
            <el-button
              :disabled="!row.url"
              @click="jumpToDetail(row)">
              跳转
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col
      class="search-area"
      :span="6">
      123
    </el-col>
  </el-row>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { getRandomData, getHotData } from '@/apis/message/gank';
import {
  hotType, hotCategory, hotWeekColumns, searchCategory,
} from '@/views/message/camp/lib/data';
import 'swiper/swiper-bundle.css';


export default {
  name: 'message-camp-home',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      hotType,
      hotCategory,
      hotWeekColumns,
      searchCategory,
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
      week: {
        hotType: 'views',
        category: 'Article',
        count: 20,
      },
      hotWeekData: [],
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
    getWeekHot() {
      getHotData({ ...this.week })
        .then((res) => {
          this.hotWeekData = res.data || [];
        });
    },
    jumpToDetail(row) {
      this.$confirm('此操作将离开eden，请确保网络安全', 'next', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-warning',
        closeOnClickModal: false,
      })
        .then(() => {
          window.open(row.url, 'blank');
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getRandomGirl();
    this.getWeekHot();
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
.search-area {
  margin-left: 10px;
}
</style>

<style lang="less">
.week-hot {
  .el-radio-group {
    margin: 5px 0;
    .el-radio {
      margin-left: 0;
      width: 160px;
      text-align: left;
    }
  }
}
</style>
