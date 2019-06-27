<template>
  <div class="vote-mht">
    <el-input
      v-model="search"
      :maxlength="15"
      placeholder="输入过滤内容"
      show-word-limit
      class="search-btn ui-mb-40"
      clearable
      size="medium"
      :disabled="loading"
      @keyup.enter.native="innerGetAllVotes">
    </el-input>
    <el-carousel
      :interval="10 * 1000"
      type="card"
      height="200px"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
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
          <i class="el-icon-delete icon" @click="innerDeleteVote(cs.id)"></i>
        </div>
        <p class="car-end">{{`NO:${cs.id}  at:${cs.created_at}`}}</p>
      </el-carousel-item>
    </el-carousel>
    <fav-tree></fav-tree>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { elTagTypes } from '@/lib/element/config';
import favTree from './fav-tree.vue';

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
  components: {
    favTree,
  },
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
    ...mapActions('moduleAnimals/cat', ['getAllVotes', 'createVote', 'deleteVote']),
    innerGetAllVotes() {
      this.loading = true;
      this.getAllVotes({ sub_id: this.search })
        .then((response) => {
          if (_.isEmpty(response)) {
            const mess = { message: '当前用户不存在vote数据', type: 'warning' };
            this.setGlobalMessage(mess);
          } else {
            response.forEach((e) => {
              const index = _.random((elTagTypes.length - 1));
              e.type = elTagTypes[index];
            });
            this.carousel = response;
          }
        })
        .catch((error) => {
          const mess = {
            message: error.response.data.message || this.netWorkError.message,
            type: 'error',
          };
          this.setGlobalMessage(mess);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    chgVote(item) {
      this.loading = true;
      const value = Math.abs(1 - item.value);
      const params = { image_id: item.image_id, sub_id: item.sub_id, value };
      this.createVote(params)
        .then(() => {
          const index = this.carousel.findIndex(e => e.id === item.id);
          this.carousel[index].value = value;
          this.setGlobalMessage({ message: '更改评分成功', type: 'success' });
        })
        .catch(() => {
          this.setGlobalMessage({ message: '更改评分失败', type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    innerDeleteVote(id) {
      this.loading = true;
      this.deleteVote(id)
        .then(() => {
          const index = this.carousel.findIndex(e => e.id === id);
          this.carousel.splice(index, 1);
          this.setGlobalMessage({ message: '删除成功', type: 'success' });
        })
        .catch((error) => {
          this.setGlobalMessage({ message: error.response.data.message || '删除失败，请稍后再试', type: 'success' });
        })
        .finally(() => {
          this.loading = false;
        });
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
