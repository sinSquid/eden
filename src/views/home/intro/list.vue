<template>
  <el-drawer
    title="Plyr"
    :visible="drawerVisible"
    size="50%"
    custom-class="ui-pl-20"
    :show-close="false"
    direction="rtl">
    <i class="el-icon-d-arrow-right cus-icon-24"
      @click="hideList">
    </i>
    <el-checkbox-group
      size="mini"
      text-color="#a8e0e0"
      :value="browsersEnable">
      <el-checkbox
        v-for="{ key, version } in browsers"
        :label="key"
        :key="key">
        {{ `${key}(${version || '-'})` }}
      </el-checkbox>
    </el-checkbox-group>
    <el-table
      max-height="300"
      stripe
      size="small"
      :data="keyMap">
      <el-table-column
        v-for="{ key, label, width } of keysCols"
        :key="key"
        :prop="key"
        :label="label"
        :width="width">
      </el-table-column>
    </el-table>
    <hr class="common-hr-split ui-mb-20">
    <el-table
      max-height="300"
      stripe
      size="small"
      :data="support">
      <el-table-column
        v-for="{ key, label, width } of supportCols"
        :key="key"
        :prop="key"
        :label="label"
        :width="width">
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import { keysCols, supportCols, browsers, keyMap, support } from './lib/data';

export default {
  name: 'intro-list',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      keysCols,
      supportCols,
      browsers,
      support,
      keyMap,
      browsersEnable: browsers.map(e => e.key),
    };
  },
  computed: {
    drawerVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  methods: {
    hideList() {
      this.drawerVisible = false;
    },
  },
};
</script>
