<template>
  <div class="cat-panel">
    <el-row type="flex" justify="start">
      <el-col :span="10" :offset="1" class="left">
        <vote-views></vote-views>
      </el-col>
      <el-col :span="10" :offset="1" class="right">
        <vote-list></vote-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import voteList from './vote-list.vue';
import voteViews from './vote-views.vue';

export default {
  name: 'catVotes',
  components: {
    voteList,
    voteViews,
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>

</style>
