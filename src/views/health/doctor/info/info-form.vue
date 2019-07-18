<template>
  <div>
    <el-form
      class="form"
      :model="ruleForm"
      ref="doctorForm"
      label-width="100px">
      <el-form-item label="Name" prop="name">
        <el-input
          v-model="ruleForm.name"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item label="Query" prop="query">
        <el-input
          v-model="ruleForm.query"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item label="Specialty_uid" prop="specialty_uid">
        <el-input
          v-model="ruleForm.specialty_uid"
          size="mini">
        </el-input>
      </el-form-item>
      <el-form-item label="Insurance_uid" prop="insurance_uid">
        <el-input
          v-model="ruleForm.insurance_uid"
          size="mini">
        </el-input>
      </el-form-item><el-form-item label="Fileds" prop="fileds">
        <el-input
          v-model="ruleForm.fields"
          size="mini">
        </el-input>
      </el-form-item><el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio
            v-for="gen in gender"
            :key="gen.key"
            :label="gen.label">
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="ui-mt-20">
        <el-button
          type="primary"
          size="mini"
          @click="innerSearchDoctors">
          search
        </el-button>
        <el-button
          size="mini"
          @click="resetForm">
          reset&cacute;
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

const gender = [
  { key: 'male', label: 'male' },
  { key: 'female', label: 'female' },
];
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
        gender: '',
        sort: '',
        fields: '',
      },
      sort,
      gender,
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
