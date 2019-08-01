<template>
  <el-row type="flex" class="summ-detail ui-mt-20">
    <el-col :span="6">
      <detail-form></detail-form>
    </el-col>
    <el-col :offset="1" :span="12">
      <detail-table></detail-table>
    </el-col>
  </el-row>
</template>

<script>
import detailForm from './detail-form.vue';
import detailTable from './detail-table.vue';

export default {
  name: 'summDetail',
  components: {
    detailForm,
    detailTable,
  },
};
</script>

<style scoped>

</style>
