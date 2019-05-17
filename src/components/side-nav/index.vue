<template>
  <div id="tp-side-nav">
    <el-menu
      default-active="home">
      <template v-for="item in NavList">
        <router-link :to="item.url" :key="item.value">
          <el-menu-item :index="item.value">
            <i class="el-icon-menu"></i>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { NavList, mainRoute } from '@/lib/config/Navigation';

export default {
  name: 'tp-side-nav',
  data() {
    return {
      NavList,
    };
  },
  computed: {
    ...mapState(['currentSideRoutePath']),

    currentRoutes() {
      const { path } = this.$route;
      return path.split('/').filter(e => e);
    },
  },
  watch: {
    currentRoutes(val) { // 手动点击以及地址栏输入均可监听
      this.syncRouteOperation(val);
    },
  },
  methods: {
    ...mapMutations([
      'setActiveTabsName',
      'setCurrentSideRoutePath',
      'setTpTabs',
    ]),

    syncRouteOperation(val) {
      this.setCurrentSideRoutePath({ path: val[0] });
      const name = val[1] || '';
      this.setActiveTabsName({ name });
      const index = mainRoute.findIndex(e => e.value === val[0]);
      const tabs = mainRoute[index].children || [];
      this.setTpTabs(tabs);
    },
  },
  mounted() {
    this.syncRouteOperation(this.currentRoutes);
  },
};
</script>

<style lang="less">
  #tp-side-nav {
    background-color: silver;
    width: 150px;
    position: fixed;
    margin-top: 40px;
    .el-menu-item {
      display: -webkit-box;
      a {
        text-decoration: none;
      }
    }
  }
</style>
