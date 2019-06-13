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
      :interval="10 * 1000"
      type="card"
      height="200px"
      v-loading="loading"
      indicator-position="none">
      <el-carousel-item v-for="(cs, index) in carousel" :key="cs.id">
        <div class="flex top">
          <el-tag class="ui-m-5" :type="cs.type">
            {{ `${cs.country_code} / ${cs.sub_id || 'demo'}` }}
          </el-tag>
          <p class="car-end">{{`${(index + 1)} / ${carousel.length}`}}</p>
        </div>
        <h4>{{ `image:${cs.image_id}` }}</h4>
        <div class="flex bottom">
          <i :class="[cs.value ? 'on' : '', 'el-icon-star-off', 'icon']" @click="chgVote(cs)"></i>
          <i class="el-icon-delete icon" @click="deleteVote"></i>
        </div>
        <p class="car-end">{{`NO:${cs.id}  at:${cs.created_at}`}}</p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getTimestamp } from '@/utils/date/extend-dayjs';
import { elTagTypes } from '@/lib/element/config';

const vote = [{
  country_code: 'CN',
  created_at: '2018-10-24T08:36:21.000Z',
  id: 31100,
  image_id: 'demo',
  sub_id: 'demo',
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
    ...mapActions('moduleAnimals/cat', ['getAllVotes', 'createVote']),
    innerGetAllVotes() {
      this.loading = true;
      this.getAllVotes({ sub_id: this.search })
        .then((response) => {
          this.loading = false;
          if (response.length) {
            response.forEach((e) => {
              const index = _.random((elTagTypes.length - 1));
              e.type = elTagTypes[index];
            });
            this.carousel = response;
          } else {
            const timestamp = getTimestamp();
            const mess = { message: '当前用户不存在vote数据', type: 'warning', timestamp };
            this.setGlobalMessage(mess);
          }
        })
        .catch((error) => {
          this.loading = false;
          const timestamp = getTimestamp();
          const mess = { message: error.message || this.netWorkError.message, type: 'error', timestamp };
          this.setGlobalMessage(mess);
        });
    },
    chgVote(item) {
      this.loading = true;
      const value = Math.abs(1 - item.value);
      const params = { image_id: item.image_id, sub_id: item.sub_id, value };
      this.createVote(params)
        .then(() => {
          this.loading = false;
          const index = this.carousel.findIndex(e => e.id === item.id);
          this.carousel[index].value = value;
          const timestamp = getTimestamp();
          this.setGlobalMessage({ message: '更改评分成功', type: 'success', timestamp });
        })
        .catch(() => {
          this.loading = false;
          const timestamp = getTimestamp();
          this.setGlobalMessage({ message: '更改评分失败', type: 'error', timestamp });
        });
    },
    deleteVote() {

    },
  },
};
</script>

<style lang="less">
  .el-carousel__item {
    border-radius: 5px;
    h4 {
      color: black;
      font-size: 14px;
      opacity: 0.75;
      line-height: 95px;
      text-align: right;
      margin-right: 10px;
    }
    .flex {
      display: flex;
      flex: 1;
      &.top {
        justify-content: space-between;
        .tag {
          margin: 5px;
        }
      }
      &.bottom {
        justify-content: flex-end;
        .icon {
          font-size: 24px;
          margin-right: 10px;
          &.on {
            color: orange;
          }
        }
      }
    }
    .car-end {
      color: #ff6c02;
      text-align: right;
      margin: 10px;
    }
  }
  .el-carousel__item:nth-child(2n) {  
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
