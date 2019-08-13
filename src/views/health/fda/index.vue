<template>
  <div class="heal-fda">
    <divider-collapse :data="dividerCollapse[0]"></divider-collapse>
    <fda-summary></fda-summary>
    <divider-collapse :data="dividerCollapse[1]"></divider-collapse>
    <fda-download></fda-download>
  </div>
</template>

<script>
import dividerCollapse from '@/components/divider-collapse/index.vue';
import fdaSummary from './summary/index.vue';
import fdaDownload from './download/index.vue';

export default {
  name: 'heaFDA',
  components: {
    dividerCollapse,
    fdaSummary,
    fdaDownload,
  },
  data() {
    return {
      dividerCollapse: [{
        divider: {
          title: 'fda&summary',
        },
        collapse: [{
          title: 'fda内容介绍',
          content: '美国食药品安全管理',
          link: 'https://open.fda.gov/apis/',
        }],
      }, {
        divider: {
          title: 'fda&download',
        },
        collapse: [{
          title: 'download相关',
          content: 'openFDA数据下载开放源,数据文件托管在以下地址链接。',
          link: 'https://download.open.fda.gov/',
        }],
      }],
    };
  },
};
</script>
