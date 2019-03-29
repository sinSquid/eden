<template>
  <div id="tp-side-nav">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
      <template v-for="(item, index) in menu">
        <el-menu-item :key="item.value" :index="index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { href } from '@/lib/config/Navigation.js'

export default {
  name: 'tp-side-nav',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  #tp-side-nav {
    background-color: silver;
  }
</style>
