<template>
  <el-drawer
    :with-header="false"
    :visible="drawerVisible"
    size="370px"
    custom-class="home-intro-plyr"
    :modal-append-to-body="false"
    :modal="false"
    :show-close="false"
    direction="rtl">
    <div class="ui-dis-flex">
      <i class="el-icon-s-unfold cus-icon-24"
        @click="hideList">
      </i>
    </div>
    <el-checkbox-group
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
import {
  keysCols, supportCols, browsers, keyMap, support,
} from './lib/data';

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
      browsersEnable: browsers.map((e) => e.key),
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

<style lang="less">
.home-intro-plyr {
  margin-top: 80px;
  padding-left: 10px;
  padding-top: 10px;
  background-color: #a8e0e0;
  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    .el-checkbox__label {
      width: 120px;
      text-align: left;
    }
  }
}
</style>
