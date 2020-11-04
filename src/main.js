import Vue from 'vue';
import lodash from 'lodash';
import ElementUI from 'element-ui';
import router from '@/router';
import store from '@/store/store';
import App from '@/App.vue';
// 按需引入v-charts，详见下文件
import '@/plugins/vcharts';
import '@/lib/server/permission';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less';
import '@/styles/override.less';

window._ = lodash;

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small', zIndex: 2000 }); // 弹窗层级

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
