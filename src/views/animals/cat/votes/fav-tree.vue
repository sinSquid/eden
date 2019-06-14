<template>
  <div class="fav-tree ui-mt-40">
    <el-input
      v-model="search"
      :maxlength="15"
      placeholder="输入过滤内容"
      show-word-limit
      class="search-btn ui-mb-40"
      clearable
      size="medium"
      :disabled="loading"
      @keyup.enter.native="innerGetFavourites">
    </el-input>
    <el-badge
      v-for="bd in data"
      :key="bd.label"
      :max="10"
      size="small"
      effect="plain"
      :value="bd.len">
      <i class="el-icon-folder icon on"></i>
    </el-badge>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { elBadgeTypes } from '@/lib/element/config';

export default {
  name: 'fav-tree',
  data() {
    return {
      loading: false,
      originData: [],
      data: [],
      search: '',
    };
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getFavourites']),
    innerGetFavourites() {
      this.loading = true;
      this.getFavourites({ sub_id: this.search })
        .then((response) => {
          console.log(response);
          this.formatData(response);
        })
        .catch((error) => {
          console.log(error);
          this.setGlobalMessage({ message: error.response.data.message || '获取收藏夹失败', type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatData(arr) {
      const obj = {};
      const data = [];
      arr.forEach((e) => {
        const key = e.sub_id ? e.sub_id : 'unix';
        if (_.hasIn(data, key)) {
          obj[key].len += 1;
          obj[key].children.push({ label: e.image_id });
        } else {
          obj[key] = { label: key, len: 1, children: Array.of({ label: e.image_id }) };
        }
      });
      _.keys(obj).forEach((key) => {
        data.push(obj[key]);
      });
      this.data = data;
    },
  },
};
</script>

<style scoped>

</style>
