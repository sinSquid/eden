<template>
  <plyr
    ref="videoPlyr">
    <div class="plyr__video-embed" style="width: 1200px;">
      <iframe
        :src="`${url}?{config}`"
        allowfullscreen
        allowtransparency
        allow="autoplay">
      </iframe>
    </div>
  </plyr>
</template>

<script>
import Plyr from '@/components/plyr/index.vue';

export default {
  name: 'intro-video',
  components: {
    Plyr,
  },
  data() {
    return {
      url: 'https://www.youtube.com/embed/IgcYZhmp_DA', // 默认的播放视频链接
      config: 'iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1',
    };
  },
};
</script>
