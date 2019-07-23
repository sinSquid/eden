<template>
  <div>
    <el-radio-group
      v-model="activeTab"
      size="small"
      class="ui-dis-flex ui-ml-20 ui-mt-10">
      <el-radio
        v-for="tab in tabs"
        :key="tab.key"
        :label="tab.label"
        border>
      </el-radio>
    </el-radio-group>
    <div class="ui-dis-flex ui-ml-20 ui-mt-30">
      <el-badge
        v-for="db of displayBadge"
        :key="db.key"
        :value="db.total"
        :max="maxAmount"
        class="ui-mr-40">
          <el-popover
            placement="right"
            :offset="100"
            :width="300">
            <p
              v-for="pv of popover"
              :key="pv"
              class="ui-mb-10">
              {{`&lt;${pv}&gt;: ${db.meta[pv]}`}}
            </p>
            <el-button
              slot="reference"
              size="small">
              {{db.label}}
            </el-button>
          </el-popover>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const tabs = [
  { key: 'food', label: 'food' },
  { key: 'drug', label: 'drug' },
];

const badge = [
  { key: 'food', total: 0, label: 'FDA/food' },
  { key: 'drug', total: 0, label: 'FDA/drug' },
];

export default {
  name: 'fdaSummary',
  components: {

  },
  data() {
    return {
      tabs,
      activeTab: 'food',
      maxAmount: 100,
      popover: ['disclaimer', 'license', 'terms', 'last_updated'],
    };
  },
  computed: {
    ...mapState('moduleHealth/fda', ['food', 'drug']),

    displayBadge() {
      const result = badge;
      _.assign(result[0], _.pick(this.food, ['total', 'meta']));
      _.assign(result[1], _.pick(this.drug, ['total', 'meta']));
      return result;
    },
  },
  methods: {

  },
};
</script>
