<template>
  <el-upload
    ref="catUpload"
    action="https://api.thecatapi.com/v1/images/upload/"
    :multiple="false"
    :limit="limit"
    :on-exceed="handleExceed"
    :accept="accept"
    :on-error="handleError"
    :on-success="handleSuccess"
    :headers="headers"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px;"
      size="small" type="success"
      @click="submitUpload">
      上传到服务器
    </el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { apiKey } from '@/lib/auth/catapi';

export default {
  name: 'upload',
  data() {
    return {
      fileList: [],
      headers: {
        'x-api-key': apiKey,
      },
      accept: '.png,.jpg',
      limit: 1,
    };
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['uploadImage']),
    submitUpload() {
      this.$refs.catUpload.submit();
    },
    handleExceed(files, fileList) {
      const message = `当前限制${this.limt}个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}个`;
      this.setGlobalMessage({ message, type: 'warning' });
    },
    handleError({ message }, file) {
      const result = JSON.parse(message);
      this.setGlobalMessage({ message: `图片${file.name}上传出现错误：${result.message}`, type: 'error' });
    },
    handleSuccess(response, file) {
      const { percentage, response: { id }, status } = file;
      if (percentage === 100 && status === 'success') {
        this.setGlobalMessage({ message: `图片上传成功，id为${id}`, type: 'success' });
        this.$refs.catUpload.clearFiles();
      }
    },
  },
};
</script>

<style scoped>

</style>
