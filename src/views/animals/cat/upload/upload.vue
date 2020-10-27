<template>
  <div>
    <el-input
      class="search-btn ui-ml-40 ui-mb-20"
      v-model="sub"
      placeholder="该用户分组"
      :maxlength="15"
      suffix-icon="el-icon-folder-opened"
      clearable>
    </el-input>
    <el-upload
      ref="catUpload"
      action="https://api.thecatapi.com/v1/images/upload/"
      :multiple="false"
      :limit="limit"
      :data="{sub_id: sub}"
      :on-exceed="handleExceed"
      :accept="accept"
      :on-error="handleError"
      :on-success="handleSuccess"
      :headers="headers"
      :file-list="fileList"
      :auto-upload="false">
      <el-button
        slot="trigger"
        type="primary">
        选取文件
      </el-button>
      <el-button
        class="ui-ml-20"
        type="success"
        @click="submitUpload">
        上传到服务器
      </el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <ve-radar class="ui-mt-40" :data="chartData"></ve-radar>
    <span>
      {{`from:${catAnalysis.vendor || 'Amazon'}  date:${catAnalysis.created_at || '--'}`}}
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { apiKey } from '@/lib/auth/catapi';

const Sample = [{ key: 'low', value: 33 }, { key: 'medium', value: 66 }, { key: 'high', value: 100 }];
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
      sub: '', // 用户下分组
    };
  },
  computed: {
    ...mapState('moduleAnimals/cat', ['catAnalysis']),
    chartData() {
      const chart = { columns: [], rows: [] };
      const aims = {};
      const sample = [];
      const origin = this.catAnalysis;
      if (origin.labels) {
        chart.columns.push('id');
        aims.id = origin.image_id;
        origin.labels.forEach((e) => {
          chart.columns.push(e.Name);
          aims[e.Name] = e.Confidence;
        });
        const name = origin.labels.map((e) => e.Name);
        Sample.forEach((s) => {
          const obj = { id: s.key };
          name.forEach((e) => { obj[e] = s.value; });
          sample.push(obj);
        });
        chart.rows = sample.concat(aims);
      }
      return chart;
    },
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['uploadImage', 'getImageAnalysis']),
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
        this.getImageAnalysis(id);
      }
    },
  },
};
</script>
