<template>
  <el-row type="flex" :gutter="20">
    <el-col :span="6" class="left">
      <info-form />
    </el-col>
    <el-col :span="8" class="left">
      <info-table />
    </el-col>
    <el-col :span="10" class="right">
      <info-detail />
    </el-col>
  </el-row>
</template>

<script>
import infoForm from './info-form.vue';
import infoTable from './info-table.vue';
import infoDetail from './info-detail.vue';

export default {
  name: 'doctor-info',
  components: {
    infoForm,
    infoTable,
    infoDetail,
  },
};
</script>
