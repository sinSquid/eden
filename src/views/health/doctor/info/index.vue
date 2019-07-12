<template>
  <el-row type="flex" :gutter="20">
    <el-col :span="6" class="left">
      <info-form></info-form>
    </el-col>
    <el-col :span="16" :offset="1">
      <info-table></info-table>
    </el-col>
  </el-row>
</template>

<script>
import infoForm from './info-form.vue';
import infoTable from './info-table.vue';

export default {
  name: 'doctor-info',
  components: {
    infoForm,
    infoTable,
  },
};
</script>
