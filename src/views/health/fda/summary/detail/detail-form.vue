<template>
  <el-form
    ref="fdaSummaryDetail"
    :model="displayForm"
    size="small"
    label-width="80px">
    <el-form-item label="检索字段" prop="search">
      <el-input
        type="textarea"
        class="textarea"
        v-model="displayForm.search">
      </el-input>
    </el-form-item>
    <el-form-item label="记录量" prop="limit">
      <el-input-number
        v-model="displayForm.limit"
        :max="counter.max"
        :min="counter.min"
        :step="counter.step">
      </el-input-number>
    </el-form-item>
    <el-form-item label="日期过滤" prop="date.start">
      <el-date-picker
        type="date"
        placeholder="开始时间"
        v-model="displayForm.date.start">
      </el-date-picker>
    </el-form-item>
    <el-form-item prop="date.end">
      <el-date-picker
        type="date"
        placeholder="截止时间"
        v-model="displayForm.date.end">
      </el-date-picker>
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
import { mapState, mapMutations, mapActions } from 'vuex';

const params = {
  search: '',
  limit: 0,
  date: {
    start: '',
    end: '',
  },
};

export default {
  name: 'detail-form',
  data() {
    return {
      ruleForm: {
        food: _.clone(params),
        drug: _.clone(params),
      },
      counter: {
        min: 0,
        max: 100,
        step: 3,
      },
    };
  },
  computed: {
    ...mapState('moduleHealth/fda', ['activeTab']),

    displayForm() {
      const type = this.activeTab === 'food' ? 'food' : 'drug';
      return this.ruleForm[type];
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleHealth/fda', ['getFDAEvent']),

    resetForm() {
      this.$refs.fdaSummaryDetail.resetFields();
    },
    innerGetFDAEvent() {
      this.getFDAEvent()
        .catch((error) => {
          const { response: { data: { message } } } = error;
          this.setGlobalMessage({ message, type: 'error' });
        });
    },
  },
};
</script>
