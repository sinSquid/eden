<template>
  <div class="cat-panel" style="height: 1200px;">
    <el-row type="flex" justify="start">
      <el-col :span="10" :offset="1" class="left">
        <upload-list></upload-list>
      </el-col>
      <el-col :span="10" :offset="1" class="right">
        <upload></upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import upload from './upload.vue';
import uploadList from './upload-list.vue';

export default {
  name: 'catUpload',
  components: {
    upload,
    uploadList,
  },
};
</script>
