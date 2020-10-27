<template>
  <el-drawer
    :wrapperClosable="false"
    :title="title"
    custom-class="custom-drawer"
    :visible.sync="drawerVisible"
    :direction="direction"
    :before-close="handleClose">
    <el-form
      ref="jsonForm"
      :model="json"
      class="json-form"
      label-width="auto">
      <el-form-item label="selectableType ">
        <el-select
          v-model="json.selectableType">
          <el-option
            v-for="st of select"
            :key="st"
            :value="st"
            :label="st">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="deep ">
        <el-select
          v-model="json.deep">
          <el-option
            v-for="dt of depth"
            :key="dt"
            :value="dt"
            :label="dt">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="so of switchOption"
        :key="so"
        :label="so">
        <el-switch
          v-model="json[so]"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
    <vue-json-pretty
      v-if="visible && ready"
      :path="json.path"
      :data="jsonData"
      :deep="json.deep"
      :show-double-quotes="json.showDoubleQuotes"
      :highlight-mouseover-node="json.highlightMouseoverNode"
      :highlight-selected-node="json.highlightSelectedNode"
      :show-length="json.showLength"
      :show-line="json.showLine"
      :select-on-click-node="json.selectOnClickNode"
      :selectable-type="json.selectableType"
      :show-select-controller="json.showSelectController"
      v-model="json.default"
      :path-selectable="((data) => typeof data === 'object')"
      @click="handleClick">
    </vue-json-pretty>
  </el-drawer>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'jsonViewer',
  components: {
    VueJsonPretty,
  },
  props: {
    title: {
      type: String,
      default: 'json-viewer',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      // rtl / ltr / ttb / tbb
      default: 'rtl',
    },
    size: {
      type: String,
      // number: px, string: %
      default: '30%',
    },
    jsonData: {
      type: Object,
      default: () => ({ key: 'value' }),
    },
  },
  data() {
    return {
      ready: true,
      json: {
        deep: 3,
        showLength: false,
        showLine: false,
        showDoubleQuotes: false,
        showSelectController: true,
        selectOnClickNode: true,
        highlightSelectedNode: false,
        highlightMouseoverNode: false,
        default: [], // string, array: -, []
        path: 'root',
        selectableType: 'single',
      },
      select: ['single', 'multiple'],
      depth: [2, 3, 4, 5],
      switch: [],
    };
  },
  computed: {
    switchOption() {
      const result = [];
      for (const [key, value] of _.toPairs(this.json)) {
        if (typeof value === 'boolean') {
          result.push(key);
        }
      }
      return result;
    },
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
    handleClick() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less">
  .custom-drawer{
    .json-form {
      background-color: rgba(128, 128, 128, 0.2);
      padding: 10px 0 10px 20px;
      .el-form-item--mini.el-form-item{
        margin-bottom: 3px;
      }
    }
    .vjs-tree.is-root{
      padding: 10px 0 10px 10px;
      background-color: mistyrose;
      max-height: 480px;
      overflow: auto;
    }
  }
</style>
