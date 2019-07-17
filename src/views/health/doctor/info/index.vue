<template>
  <el-row type="flex" :gutter="20">
    <el-col :span="5" class="left">
      <info-form></info-form>
    </el-col>
    <el-col :span="8" class="left">
      <info-table></info-table>
    </el-col>
    <el-col :span="11" class="right">
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
