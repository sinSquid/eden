<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'takeaway-platform',
  computed: {
    ...mapState(['globalMessage'])
  },
  watch: {
    globalMessage (val) {
      if (val.message === '') { return }
      this.$message(val)
    }
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
}
</style>
