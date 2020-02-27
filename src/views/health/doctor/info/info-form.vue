<template>
  <el-form
    class="info-form"
    :model="ruleForm"
    ref="doctorForm"
    size="mini"
    label-width="100px">
    <el-form-item
      v-for="key of Object.keys(ruleForm).slice(0, 4)"
      :key="key"
      :label="key"
      :prop="key">
      <el-input v-model="ruleForm[key]" />
    </el-form-item>
    <el-form-item label="gender" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio
          v-for="{ key, label } of gender"
          :key="key"
          :label="label" />
      </el-radio-group>
    </el-form-item>
    <el-form-item class="ui-mt-20">
      <el-button
        type="primary"
        @click="innerSearchDoctors">
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

const sort = [
  { key: 'full-name-asc', label: 'full-name-asc' },
  { key: 'full-name-desc', label: 'full-name-desc' },
  { key: 'last-name-asc', label: 'last-name-asc' },
  { key: 'last-name-desc', label: 'last-name-desc' },
  { key: 'first-name-asc', label: 'first-name-asc' },
  { key: 'first-name-desc', label: 'first-name-desc' },
  { key: 'best-match-asc', label: 'best-match-asc' },
  { key: 'best-match-desc', label: 'best-match-desc' },
  { key: 'rating-asc', label: 'rating-asc' },
  { key: 'rating-desc', label: 'rating-desc' },
  { key: 'distance-asc', label: 'distance-asc' },
  { key: 'distance-desc', label: 'distance-desc' },
];
export default {
  name: 'info-form',
  data() {
    return {
      ruleForm: {
        name: '',
        query: '',
        specialty_uid: '', // 专业的UID
        insurance_uid: '', // 保险计划的UID
        gender: 'male',
        sort: '',
        fields: '',
      },
      sort,
      gender: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' },
      ],
    };
  },
  computed: {
    ...mapState('moduleHealth/doctor', ['doctor']),
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapMutations('moduleHealth/doctor', ['setDoctor']),
    ...mapActions('moduleHealth/doctor', ['searchDoctors']),
    innerSearchDoctors() {
      this.setDoctor(this.ruleForm);
      this.searchDoctors()
        .catch((error) => {
          const { response: { data: { meta: { message } } } } = error;
          this.setGlobalMessage({ message, type: 'error' });
        });
    },
    resetForm() {
      this.$refs.doctorForm.resetFields();
    },
  },
};
</script>
