/* v-charts按需引入 */

import Vue from 'vue';
import VeLine from 'v-charts/lib/line.common.min';
import VeChart from 'v-charts/lib/chart.common.min';
import VeHistogram from 'v-charts/lib/histogram.common.min';
import VeScatter from 'v-charts/lib/scatter.common.min';
import VeRadar from 'v-charts/lib/radar.common.min';
import VeLiquidfill from 'v-charts/lib/liquidfill.common.min';

const component = [VeLine, VeChart, VeHistogram, VeScatter, VeRadar, VeLiquidfill];
(function init() {
  for (const com of component) {
    Vue.component(com.name, com);
  }
}());
