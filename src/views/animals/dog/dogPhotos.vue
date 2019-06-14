<template>
  <div class="dog-photos">
    <el-row type="flex" align="middle">
      <el-col :span="4">
        <el-input-number
          v-model="volume.value"
          controls-position="right"
          size="small"
          :min="volume.min"
          :step="volume.step"
          :max="volume.max">
        </el-input-number>
      </el-col>
      <el-col :span="4">
        <el-tooltip
          effect="light"
          :content="control.content"
          placement="top-start"
          :open-delay="control.open"
          :hide-after="control.hide">
          <el-switch
            v-model="control.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :validate-event="control.validate"
            @change="getRandomDogsLimitVolume($event)">
          </el-switch>
        </el-tooltip>
      </el-col>
    </el-row>
    <ul
      class="list"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled">
      <li v-for="url in displayUrls" :key="url" class="list-item">
        <el-image :src="url"></el-image>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

const volume = {
  value: 1,
  min: 1,
  max: 50,
  step: 5,
};
const control = {
  open: 100,
  hide: 5 * 1000,
  value: false,
  validate: false,
  content: '请求输入的狗子图片',
};

export default {
  name: 'dogPhotos',
  data() {
    return {
      loading: false,
      init: 5, // 初始化加载5张
      urls: [],
      displayUrls: [],
      volume,
      control,
    };
  },
  computed: {
    ...mapState(['netWorkError']),
    noMore() {
      return this.displayUrls.length >= this.urls.length;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/dog', ['getRandomDogsLimit']),
    load() {
      this.loading = true;
      setTimeout(() => {
        const increase = this.displayUrls.length + this.init;
        const len = this.urls.length;
        const end = len >= increase ? increase : len;
        this.displayUrls = _.slice(this.urls, 0, end);
        this.loading = false;
      }, 2 * 1000);
    },
    getRandomDogsLimitVolume(val) {
      if (val) {
        this.getRandomDogsLimit(this.volume.value)
          .then((response) => {
            const { status, message } = response;
            if (status === 'success') {
              this.urls = message;
              const len = message.length || 0;
              const end = len > this.init ? this.init : len;
              this.displayUrls = _.slice(message, 0, end);
            }
          })
          .catch(() => {
            this.setGlobalMessage(this.netWorkError);
          });
      } else {
        this.displayUrls = [];
        this.urls = [];
      }
    },
  },
};
</script>

<style scoped>

</style>
