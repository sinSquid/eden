<template>
  <div class="eden-header">
    <div class="logo"></div>
    <div class="content">
      <div class="user">
        <div :class="userInfo.avatar"></div>
        <div class="username">
          <span>{{ userInfo.username }}</span>
        </div>
      </div>
      <i class="el-icon-switch-button cus-icon-24 ui-mt-15"
        @click="confirmExit">
      </i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { removeUserToken } from '@/lib/store/cookie';
import { store } from '@/lib/store/forage';

export default {
  name: 'eden-header',
  computed: {
    ...mapState(['userInfo']),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),

    confirmExit() {
      this.$confirm('此操作将退至登录页?', 'exit', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-error',
        closeOnClickModal: false,
      })
        .then(() => {
          this.signOut();
        });
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
  },
};
</script>

<style lang="less" scoped>
  @_logo:'~@/assets/images/logos';
  @avatar:'~@/assets/images/avatar';
  @index: 1, 2, 3, 4, 5, 6, 7, 8, 9;
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
      margin-right: 40px;
      display: flex;
      flex: auto;
      justify-content: flex-end;
      .user {
        margin-left: 10px;
        width: 100px;
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
          margin-left: 10px;
          cursor: pointer;
          span {
            position: absolute;
            bottom: 0;
            padding: 0;
            margin: 0;
            &:hover {
              color: #2db7f5;
            }
          }
        }
      }
    }
  }
</style>
