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
        @click="signOut">
      </i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { removeUserToken } from '@/lib/store/cookie';

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

    signOut() {
      removeUserToken()
        .then(() => {
          this.removeStorage()
            .then(() => {
              this.$router.push({ path: '/login' });
            })
            .catch(({ message }) => {
              this.setGlobalMessage({ message, type: 'error' });
            });
        })
        .catch(({ message }) => {
          this.setGlobalMessage({ message, type: 'error' });
        });
    },
    removeStorage() {
      sessionStorage.removeItem(this.vuexKey);
      const vuex = sessionStorage.getItem(this.vuexKey);
      return new Promise((resolve, reject) => {
        if (vuex) {
          reject(new Error('vuex preset fail'));
        } else {
          setTimeout(() => {
            resolve('success');
          }, 1500);
        }
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
