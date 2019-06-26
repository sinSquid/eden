<template>
  <div class="cat-image">
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ctaUploadForm"
      label-position="right"
      label-width="60px">
      <el-form-item label="Order" prop="order">
        <el-radio-group
          class="item-limit"
          v-model="ruleForm.order"
          size="mini">
          <el-radio-button
            v-for="st in order"
            :key="st"
            :label="st">
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Sub_id" prop="sub_id">
        <el-input
          class="item-limit"
          v-model="ruleForm.sub_id"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item label="Limit" prop="limit">
        <el-input
          class="item-limit"
          v-model="ruleForm.limit"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item class="ui-mt-20">
        <el-button
          type="primary"
          size="mini"
          @click="searchImages">
          search
        </el-button>
        <el-button
          size="mini"
          @click="resetForm">
          reset
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="catUploadTable"
      :max-height="480"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      stripe
      :fit="false"
      tooltip-effect="light"
      size="small"
      :row-class-name="rowClassName"
      :data="data">
      <el-table-column
        v-for="col in columns"
        :prop="col.key"
        :key="col.key"
        :fixed="col.fixed"
        :sortable="col.sort"
        :label="col.label"
        :width="col.width">
      </el-table-column>
      <el-table-column
        align="right"
        label="操作"
        :width="80">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="deleteImage(row.id)">delete</el-button>
          <i class="el-icon-data-analysis" @click="analysisImage(row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { validateHundred } from '@/utils/validator';
// 表格列
const columns = [
  {
    key: 'id', label: 'ID', width: 120, sort: true, fixed: true,
  },
  { key: 'sub_id', label: '所属用户', width: 120 },
  { key: 'size', label: '尺寸', width: 100 },
  { key: 'created_at', label: '创建时间', width: 160 },
];
const order = ['RANDOM', 'ASC', 'DESC'];

export default {
  name: 'voteViews',
  data() {
    return {
      ruleForm: {
        order: '',
        sub_id: '',
        limit: '',
      },
      rules: {
        limit: [{
          type: 'number',
          message: '请输入0-100(include null)',
          trigger: 'blur',
          validator: validateHundred,
        }],
      },
      columns,
      loading: false,
      order,
      data: [],
    };
  },
  computed: {
    ...mapState('moduleAnimals/cat', ['originImages']),
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getUploadImages', 'deleteUploadImage', 'getImageAnalysis']),
    searchImages() {
      this.$refs.ctaUploadForm.validate((validate) => {
        if (!validate) {
          return;
        }
        this.loading = true;
        this.getUploadImages(this.ruleForm)
          .then((response) => {
            if (response.length) {
              response.forEach((e) => {
                e.size = `${e.width} * ${e.height}`;
              });
              this.data = response;
            } else {
              this.setGlobalMessage({ message: '您还未上传图片，期待您加入我们哦', type: 'info' });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    resetForm() {
      this.$refs.ctaUploadForm.resetFields();
    },
    deleteImage(id) {
      this.deleteUploadImage(id)
        .then(() => {
          const index = this.data.findIndex(e => e.id === id);
          this.data.splice(index, 1);
          this.setGlobalMessage({ message: '删除上传图片成功', type: 'success' });
        })
        .catch((error) => {
          const { response: { data: { message } } } = error;
          const mess = { message: message || '删除出错，请稍后再试', type: 'error' };
          this.setGlobalMessage(mess);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    analysisImage(id) {
      this.loading = true;
      this.getImageAnalysis(id)
        .catch((error) => {
          const { response: { message } } = error;
          this.setGlobalMessage({ message, type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    rowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'success-row';
      }
      return '';
    },
  },
};
</script>
<style lang="less">
  .el-table .success-row {
    background-color: #fdf5e6;
  }
</style>
