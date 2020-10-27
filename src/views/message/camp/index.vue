<template>
  <div class="message-camp">
    <div class="camp-tabs">
      <el-tabs
        tab-position="left"
        v-model="active"
        style="height: auto;">
        <el-tab-pane
          v-for="{ key, label } of tabs"
          :key="key"
          :name="key"
          lazy
          :label="label" />
      </el-tabs>
    </div>
    <div class="tab-area">
      <Category v-show="active === 'category'" />
      <Home v-show="active === 'home'" />
      <Recall v-show="active === 'recall'" />
      <Welfare v-show="active === 'welfare'" />
    </div>
  </div>
</template>

<script>
import Category from './category/index.vue';
import Home from './home/index.vue';
import Recall from './recall/index.vue';
import Welfare from './welfare/index.vue';

export default {
  name: 'camp',
  components: {
    Category,
    Home,
    Recall,
    Welfare,
  },
  data() {
    return {
      listVisible: false,
      active: 'home',
      tabs: [
        { key: 'home', label: '主页' },
        { key: 'recall', label: '回忆' },
        { key: 'category', label: '闲读百宝囊' },
        { key: 'welfare', label: '福利' },
      ],
    };
  },
  methods: {
    openList() {
      this.listVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.message-camp {
  display: flex;
  flex: 1;
  .tab-area {
    margin-top: 10px;
    width: 100%;
  }
}
</style>

<style lang="less">
.camp-tabs {
  .el-tabs__item{
    width: 120px;
  }
}
</style>
