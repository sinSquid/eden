<template>
  <div id="app">
    <tp-header></tp-header>
    <div class="container">
      <tp-side-nav></tp-side-nav>
      <section>
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import TpHeader from '@/components/header/index.vue'
import TpSideNav from '@/components/side-nav/index.vue'

export default {
  name: 'takeaway-platform',
  components: {
    TpHeader,
    TpSideNav
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
