<template>
  <div class="cat-image">
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ctaImagesForm"
      label="60px">
      <el-form-item label="Size" prop="size">
        <el-select
          class="item-limit"
          v-model="ruleForm.size"
          size="mini"
          placeholder="请选择图片尺寸">
          <el-option
            v-for="sz in size"
            :key="sz.value"
            :label="sz.label"
            :value="sz.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Sort" prop="sort">
        <el-radio-group
          class="item-limit"
          v-model="ruleForm.sort"
          size="mini">
          <el-radio-button
            v-for="st in sort"
            :key="st"
            :label="st">
          </el-radio-button>
        </el-radio-group>
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
    <div class="sub-lock">
      <i class="sub-icon icon el-icon-folder" @click="lockSub"></i>
      <el-input
        class="sub-btn ui-ml-10"
        size="mini"
        :maxlength="12"
        v-model="sub.id"
        :disabled="sub.lock"
        :suffix-icon="sub.lock ? 'el-icon-lock' : 'el-icon-unlock'">
      </el-input>
      <el-tooltip
        effect="light"
        :content="sub.tip"
        placement="top-start">
        <i class="ui-ml-20 sub-icon el-icon-chat-dot-round"></i>
      </el-tooltip>
    </div>
    <el-table
      ref="catImagesTable"
      :max-height="480"
      v-loading="loading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(153, 169, 191, 0.1)"
      stripe
      :fit="false"
      tooltip-effect="light"
      size="small"
      @expand-change="loadImage"
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
      <el-table-column type="expand" width="30">
        <template slot-scope="{ row }">
          <el-image
            :src="row.url"
            fit="contain"
            @load="loadedImage(row.id)"
            class="load-image ui-ml-40">
          </el-image>
        </template>`
      </el-table-column>
      <el-table-column
        align="right"
        label="评分"
        :width="80">
        <template slot-scope="{ row }">
          <el-rate
            v-model="row.rate"
            :low-threshold="1"
            :high-threshold="2"
            @change="innerCreateVote(row)"
            :max="2"
            :colors="{1: '#F7BA2A', 2: '#FF9900'}">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        label="收藏"
        :width="60">
        <template slot-scope="{ row }">
          <i :class="[row.fav ? 'el-icon-folder-remove' : 'el-icon-folder-add', 'icon off']"
            @click="chgFavourite(row)">
          </i>
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
  { key: 'size', label: '尺寸', width: 100 },
  { key: 'suffix', label: '格式', width: 120 },
];
const sort = ['RANDOM', 'ASC', 'DESC'];
const size = [
  {
    value: 'full',
    label: 'full',
  }, {
    value: 'med',
    label: 'med',
  }, {
    value: 'small',
    label: 'small',
  }, {
    value: 'thumb',
    label: 'thumb',
  }];

export default {
  name: 'voteViews',
  data() {
    return {
      ruleForm: {
        sort: '',
        size: '',
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
      sort,
      size,
      data: [],
      sub: {
        lock: true,
        id: '',
        tip: '评分时可通过该输入内容建立子用户(sub_id)收藏夹',
      },
    };
  },
  computed: {
    ...mapState('moduleAnimals/cat', ['originImages']),
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getPublicImages', 'createVote', 'createFavourite', 'deleteFavourite']),
    searchImages() {
      this.$refs.ctaImagesForm.validate((validate) => {
        if (!validate) {
          return;
        }
        this.getPublicImages(this.ruleForm)
          .then(() => {
            const arr = _.cloneDeep(this.originImages);
            arr.forEach((e) => {
              e.size = `${e.width} * ${e.height}`;
              const index = e.url.lastIndexOf('.') + 1;
              e.suffix = e.url.substr(index).toUpperCase();
              e.loaded = false;
              e.rate = 0;
              e.back_rate = 0;
              e.fav = false;
              e.favid = 0;
            });
            this.data = arr;
          });
      });
    },
    resetForm() {
      this.$refs.ctaImagesForm.resetFields();
    },
    loadImage(row, expandedRows) {
      if (expandedRows.length && !expandedRows[0].loaded) {
        this.loading = true;
      }
    },
    loadedImage(id) {
      const index = this.data.findIndex(e => e.id === id);
      this.data[index].loaded = true;
      this.loading = false;
    },
    lockSub() {
      this.sub.lock = !this.sub.lock;
    },
    innerCreateVote(row) {
      this.loading = true;
      const value = (row.rate - 1);
      const params = { image_id: row.id, sub_id: this.sub.id, value };
      const index = this.data.findIndex(e => e.id === row.id);
      this.createVote(params)
        .then(() => {
          this.loading = false;
          this.data[index].back_rate = (value + 1);
          this.setGlobalMessage({ message: '评分成功', type: 'success' });
        })
        .catch((error) => {
          this.loading = false;
          this.data[index].rate = row.back_rate;
          const mess = { message: error.response.data.message || '评分出错，请稍后再试', type: 'error' };
          this.setGlobalMessage(mess);
        });
    },
    chgFavourite(row) {
      this.loading = true;
      const { id, fav, favid } = row;
      const params = fav ? favid : { image_id: id, sub_id: this.sub_id };
      const tip = fav ? '删除' : '收藏';
      const callBack = fav ? this.deleteFavourite(params) : this.createFavourite(params);
      callBack
        .then((response) => {
          if (response.message === 'SUCCESS') {
            const index = this.data.findIndex(e => e.id === row.id);
            this.data[index].fav = !fav;
            if (!fav) {
              this.data[index].favid = response.id;
            }
            this.setGlobalMessage({ message: `${tip}成功`, type: 'success' });
          }
        })
        .catch((error) => {
          const mess = { message: error.response.data.message || `${tip}出错，请稍后再试`, type: 'error' };
          this.setGlobalMessage(mess);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less">
  .cat-image {
    .form {
      width: 270px;
      .el-form-item {
        margin-bottom: 5px;
      }
      .item-limit {
        width: 210px;
      }
    }
    .sub-lock {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      margin-right: 200px;
      .sub-icon {
        font-size: 28px;
      }
      .sub-btn {
        width: 160px;
        height: 28px;
        .el-input__icon {
          font-size: 20px;
        }
      }
    }
    .load-image {
      width: 240px;
    }
    .icon {
     cursor: pointer;
      &.on {
        font-size: 24px;
      }
      &.off {
        font-size: 20px;
      }
    }
  }
</style>
