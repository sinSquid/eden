import Vue from 'vue';
import _ from 'lodash';
import ElementUI from 'element-ui';
import router from '@/router';
import store from '@/store/store';
import App from '@/App.vue';
// 按需引入v-charts，详见下文件
import '@/plugins/vcharts';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less';

import '@/lib/server/permission';

window._ = _;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
