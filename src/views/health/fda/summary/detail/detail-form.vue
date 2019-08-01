<template>
  <el-form
    ref="fdaSummaryDetail"
    :model="queryForm"
    size="small"
    label-width="80px">
    <el-form-item label="检索字段" prop="search">
      <el-row type="flex" justify="start">
        <el-col :span="16">
          <el-input
            type="textarea"
            class="textarea"
            v-model="queryForm.search">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button
            @click="addNewTag"
            type="primary">
            + New Tags
          </el-button>
        </el-col>
      </el-row>
      <el-radio v-model="calculate" label="both">both(use:+AND+)</el-radio>
      <el-radio v-model="calculate" label="either">either(use:+)</el-radio>
      <div class="ui-dis-flex">
        <el-tag
          v-for="tag in queryForm.tags"
          :key="tag.name"
          closable
          :type="tag.type"
          class="ui-mr-5"
          @close="removeTag(tag.name)">
          {{tag.name}}
        </el-tag>
      </div>
    </el-form-item>
    <el-form-item label="记录量" prop="limit">
      <el-input-number
        v-model="queryForm.limit"
        :max="counter.max"
        :min="counter.min"
        :step="counter.step">
      </el-input-number>
    </el-form-item>
    <el-form-item label="日期过滤" prop="start">
      <el-date-picker
        type="date"
        placeholder="开始时间"
        v-model="queryForm.start">
      </el-date-picker>
    </el-form-item>
    <el-form-item prop="end" label-width="0">
      <div class="ui-dis-flex">
        <el-select
          v-model="queryForm.dateType"
          clearable
          placeholder="日期类型"
          class="ui-wh-120 ui-mr-20">
          <el-option
            v-for="dt in dateType"
            :key="dt.value"
            :label="dt.label"
            :value="dt.value">
          </el-option>
        </el-select>
        <el-date-picker
          type="date"
          placeholder="截止时间"
          v-model="queryForm.end">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item
      class="ui-mt-20"
      label-width="0">
      <el-button
        type="primary"
        @click="innerGetFDAEvent">
        search
      </el-button>
      <el-button
        @click="resetForm">
        reset
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  mapActions, mapMutations, mapState, mapGetters,
} from 'vuex';
import { formatData } from '@/utils/date/dayjs';
import { elTagTypes } from '@/lib/element/config';

const queryParams = {
  search: '',
  limit: 6,
  dateType: '',
  start: '',
  end: '',
  tags: [],
};

const queryDate = {
  food: [
    { value: 'date_created', label: 'date_created' },
    { value: 'date_started', label: 'date_started' },
  ],
  drug: [
    { value: 'receiptdate', label: 'receiptdate' },
    { value: 'receivedate', label: 'receivedate' },
    { value: 'transmissiondate', label: 'transmissiondate' },
  ],
};

export default {
  name: 'detail-form',
  data() {
    return {
      ruleForm: {
        food: _.cloneDeep(queryParams),
        drug: _.cloneDeep(queryParams),
      },
      calculate: 'both', // search参数过滤规则both、either
      counter: {
        min: 0,
        max: 100,
        step: 3,
      },
    };
  },
  computed: {
    ...mapState('moduleHealth/fda', ['activeTab']),
    ...mapGetters('moduleHealth/fda', ['detailTab']),

    queryForm() {
      return this.ruleForm[this.detailTab];
    },
    dateType() {
      return queryDate[this.detailTab];
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapMutations('moduleHealth/fda', ['setFDAParams']),
    ...mapActions('moduleHealth/fda', ['getFDAEvent']),

    resetForm() {
      this.$refs.fdaSummaryDetail.resetFields();
    },
    formatParams() {
      const aims = this.queryForm;
      let search = '';
      if (aims.dateType) {
        const start = formatData(aims.start, 'YYYY-MM-DD');
        const end = formatData(aims.end, 'YYYY-MM-DD');
        search += `${aims.dateType}:[${start} TO ${end}]`;
      }
      for (const tag of this.queryForm.tags) {
        const hyphen = tag.calculate === 'both' ? ' AND ' : ' ';
        search += hyphen + tag.name;
      }
      return {
        search,
        limit: aims.limit,
      };
    },
    innerGetFDAEvent() {
      if (this.queryForm.dateType) {
        if (!(this.queryForm.start && this.queryForm.end)) {
          this.setGlobalMessage({ message: '请选择过滤日期', type: 'info' });
          return;
        }
      }
      const params = this.formatParams();
      this.setFDAParams(params);
      this.getFDAEvent()
        .catch((error) => {
          const { response: { data: { error: { code, message } } } } = error;
          this.setGlobalMessage({ message: `${code}: ${message}`, type: 'error' });
        });
    },
    addNewTag() {
      const search = this.queryForm.search.trim();
      if (!search) {
        this.setGlobalMessage({ message: '请输入过滤信息', type: 'info' });
        return;
      }
      if (this.queryForm.tags.length >= 5) {
        this.setGlobalMessage({ message: '增加的过滤条件太多，已禁止新增，请删除部分内容后再新增', type: 'warning' });
        return;
      }
      const len = elTagTypes.length - 1;
      const index = _.random(0, len);
      this.queryForm.tags.push({
        name: this.queryForm.search,
        type: elTagTypes[index],
        calculate: this.calculate,
      });
      this.queryForm.search = '';
    },
    removeTag(tag) {
      const index = this.queryForm.tags.findIndex(e => e.name === tag);
      this.queryForm.tags.splice(index, 1);
    },
  },
};
</script>
