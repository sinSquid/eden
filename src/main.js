import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store/store.js'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

import '@/lib/server/permission.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
