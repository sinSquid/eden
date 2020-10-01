<template>
  <el-container>
    <el-header height="40px">
      <div class="eden-header">
        <div class="logo" />
        <div class="content">
          <div class="user">
            <div :class="userInfo.avatar || 'avatar1'" />
            <el-dropdown
              class="username"
              @command="jumpUserInfo">
          <span class="el-dropdown-link">
            {{userInfo.username}}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user/me">个人信息</el-dropdown-item>
                <el-dropdown-item command="/user/more">更多</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <i class="el-icon-switch-button cus-icon-24 ui-mt-15"
            @click="confirmExit">
          </i>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <div class="eden-side-nav">
          <el-menu
            :default-active="defaultMenu">
            <el-submenu
              v-for="item of menusList"
              :key="item.code"
              :index="item.code">
              <span slot="title">{{ item.name }}</span>
              <el-menu-item
                v-for="ch of item.children"
                :key="ch.code"
                :index="ch.uri"
                @click="toggleMenu(ch)">
                <i class="el-icon-menu"></i>
                <span>{{ ch.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header height="40px">
          <el-tabs
            :value="currentTab"
            type="border-card"
            :closable="moreThanOne"
            @tab-remove="removeTabs"
            @tab-click="activeCurrentTab">
            <el-tab-pane
              v-for="tab of tabsList"
              :key="tab.uri"
              :label="tab.name"
              :name="tab.uri" />
          </el-tabs>
        </el-header>
        <el-main class="container-shell">
          <keep-alive :include="includeList" :max="20">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { store } from '@/lib/store/forage';
import modulesCollection from '@/store/modules';
import { removeUserToken } from '@/lib/store/cookie';

export default {
  name: 'eden',
  computed: {
    ...mapState(['userInfo', 'currentTab', 'tabsList', 'menusList']),
    ...mapGetters(['sublayerRoute']),

    defaultMenu() {
      const { path } = this.$route;
      return _.get(this.sublayerRoute.find((e) => path.includes(e.uri)), 'uri');
    },
    moreThanOne() {
      return this.tabsList.length > 1;
    },
    includeList() {
      return this.tabsList.map((e) => e.label);
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage', 'updateCurrentTab', 'updateTabsList', 'removeCurrentTab']),

    confirmExit() {
      this.$confirm('此操作将退至登录页?', 'exit', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-error',
        closeOnClickModal: false,
      })
        .then(() => {
          this.signOut();
        })
        .catch(() => {});
    },
    signOut() {
      removeUserToken()
        .then(() => {
          store.removeItem(this.userInfo.username)
            .then(() => {
              setTimeout(() => {
                this.$router.push({ path: '/login' });
              }, 400);
            })
            .catch(({ message }) => {
              this.setGlobalMessage({ message, type: 'error' });
            });
        })
        .catch(({ message }) => {
          this.setGlobalMessage({ message, type: 'error' });
        });
    },
    jumpUserInfo(command) {
      const { path } = this.$route;
      if (path === command) {
        return;
      }
      this.$router.push(command);
    },
    removeTabs(url) {
      const { parentCode } = this.tabsList.find((e) => e.uri === url);
      const currentModule = modulesCollection[parentCode];
      const total = this.tabsList
        .reduce((acc, e) => {
          const add = e.parentCode === parentCode ? 1 : 0;
          return acc + add;
        }, 0);
      if (total === 1) { // 该模块下仅余此tab，移除tab时注销module
        if (currentModule && this.$store.state[currentModule.name]) {
          this.$store.unregisterModule(currentModule.name);
        }
      }
      this.removeCurrentTab(url);
    },
    activeCurrentTab(tab) {
      if (this.currentTab !== tab.name) {
        this.updateCurrentTab(tab.name);
        this.$router.push({ path: tab.name });
      }
    },
    toggleMenu(menu) {
      if (menu.uri === this.currentTab) {
        return;
      }
      /* 在当前的tabs内找不到入参菜单的parentCode，说明该菜单是第一个传入tabsList的子项，需要注册vuex模块 */
      if (this.tabsList.findIndex((e) => e.parentCode === menu.parentCode) === -1) {
        const currentModule = modulesCollection[menu.parentCode];
        if (currentModule) {
          this.$store.registerModule(currentModule.name, currentModule);
        }
      }
      this.updateCurrentTab(menu.uri);
      this.updateTabsList(menu);
      this.$router.push({ path: menu.uri });
    },
  },
  mounted() {
    this.$nextTick(() => {
      const tab = this.sublayerRoute.find((e) => e.uri === this.defaultMenu);
      const { parentCode, uri } = tab;
      /* 初始化有vuex子模块的，需要注册vuex模块 */
      const currentModule = modulesCollection[parentCode];
      if (currentModule && !this.$store.state[currentModule.name]) {
        this.$store.registerModule(currentModule.name, currentModule);
      }
      this.updateCurrentTab(uri);
      this.updateTabsList(tab);
    });
  },
};
</script>

<style lang="less" scoped>
@_logo:'~@/assets/images/logos';
@avatar:'~@/assets/images/avatar';
@index: 1, 2, 3, 4, 5, 6, 7, 8, 9;

.el-header {
  padding: 0;
  .eden-header {
    position: fixed;
    width: 100%;
    height: 40px;
    background-color: #dcdcdc;
    display: flex;
    flex: auto;
    justify-content: flex-end;
    z-index: 1;
    .logo {
      width: inherit;
      height: 40px;
      margin-left: 24px;
      background: url("@{_logo}/badoo.svg") no-repeat;
      background-size: 40px;
    }
    .content {
      width: 320px;
      max-width: 320px;
      margin-right: 20px;
      display: flex;
      flex: auto;
      justify-content: flex-end;
      .user {
        margin-left: 10px;
        display: flex;
        each(@index, {
          .avatar@{value} {
            cursor: pointer;
            width: 40px;
            background: url("@{avatar}/avatar@{value}.svg") no-repeat;
            background-size: 40px;
          }
        })
        .username {
          margin: 0 10px 5px 10px;
          display: flex;
          flex-direction: column-reverse;
          .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
          }
        }
      }
    }
  }
  .el-tabs {
    height: 40px;
  }
}
.eden-side-nav {
  background-color: silver;
  width: 150px;
  position: fixed;
  .el-menu-item {
    display: -webkit-box;
  }
}
.container-shell {
  max-height: 940px;
  overflow-y: auto;
}
</style>
