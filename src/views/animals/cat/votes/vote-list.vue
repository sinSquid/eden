<template>
  <div style="height: 800px;">
    <el-input
      v-model="search"
      :maxlength="15"
      placeholder="输入过滤内容"
      show-word-limit
      class="search-btn ui-mb-40"
      clearable
      :disabled="loading"
      @keyup.enter.native="innerGetAllVotes"
      suffix="el-icon-search">
    </el-input>
    <el-carousel
      :interval="6000"
      type="card"
      height="200px"
      indicator-position="none">
      <el-carousel-item v-for="(cs, index) in carousel" :key="cs.id">
        <p class="car-end">{{`${(index + 1)} / ${carousel.length}`}}</p>
        <h4>{{ `image:${cs.image_id}` }}</h4>
        <i :class="[cs.value ? 'el-icon-star-on' : 'el-icon-star-off', 'icon-start']"></i>
        <p class="car-end">{{`NO:${cs.id}  at:${cs.created_at}`}}</p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getTimestamp } from '@/utils/date/extend-dayjs';

const vote = [{
  country_code: null,
  created_at: '2018-10-24T08:36:21.000Z',
  id: 31100,
  image_id: '8rm',
  sub_id: null,
  value: 1,
}];

export default {
  name: 'voteList',
  data() {
    return {
      search: '',
      carousel: vote,
      loading: false,
    };
  },
  computed: {
    ...mapState(['netWorkError']),
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getAllVotes']),
    innerGetAllVotes() {
      const params = { sub_id: this.search };
      this.getAllVotes(params)
        .then((response) => {
          if (response.length) {
            this.carousel = response;
          } else {
            const timestamp = getTimestamp();
            const mess = { message: '当前用户不存在vote数据', type: 'warning', timestamp };
            this.setGlobalMessage(mess);
          }
        })
        .catch((error) => {
          const timestamp = getTimestamp();
          const mess = { message: error.message || this.netWorkError.message, type: 'error', timestamp };
          this.setGlobalMessage(mess);
        });
    },
  },
};
</script>

<style lang="less">
  .el-carousel__item {
    border-radius: 5px;
    h4 {
      color: #42b983;
      font-size: 14px;
      opacity: 0.75;
      line-height: 95px;
      text-align: right;
      margin-right: 10px;
    }
    .car-end {
      color: #ff6c02;
      text-align: right;
      margin: 10px;
    }
    .icon-start {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      font-size: 30px;
      margin-right: 10px;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
