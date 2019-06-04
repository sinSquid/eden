import Vue from 'vue';
import _ from 'lodash';
import { BigNumber } from 'bignumber.js';
import ElementUI from 'element-ui';
import VCharts from 'v-charts';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less';

import '@/lib/server/permission';

window._ = _;
window.big = BigNumber;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
