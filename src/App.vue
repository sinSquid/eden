<template>
  <div id="app">
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

<style lang="less">
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4,
h5, h6, hr, input, li, ol, p, pre, td, textarea, th, ul {
  margin: 0;
  padding: 0;
}
body {
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: silver;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #a8e0e0;
    -webkit-box-shadow: silver;
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background: #ffc0cb;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
