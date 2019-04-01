<template>
  <div class="view">
    <tp-header></tp-header>
    <div class="container">
      <tp-side-nav></tp-side-nav>
      <div class="container-shell">
        <tp-tabs></tp-tabs>
        <div class="container-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TpHeader from '@/components/header/index.vue'
import TpSideNav from '@/components/side-nav/index.vue'
import TpTabs from '@/components/tp-tabs/index.vue'

export default {
  name: 'takeaway-platform',
  components: {
    TpHeader,
    TpSideNav,
    TpTabs
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .view {
    .container {
      overflow: hidden;
      height: 100%;
      .container-shell {
        position: relative;
        height: -webkit-fill-available;
        left: 150px;
        top: 40px;
        .container-content {
          height: 800px;
        }
      }
    }
  }
</style>
