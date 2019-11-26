<template>
  <div class="ui-dis-flex">
    <intro-video />
    <i class="ui-ml-20 el-icon-d-arrow-left cus-icon-24"
      @click="openList">
    </i>
    <intro-list
      :visible.sync="listVisible" />
  </div>
</template>

<script>
import introVideo from './video.vue';
import introList from './list.vue';

export default {
  name: 'intro',
  components: {
    introVideo,
    introList,
  },
  data() {
    return {
      listVisible: false,
    };
  },
  methods: {
    openList() {
      this.listVisible = true;
    },
  },
};
</script>
