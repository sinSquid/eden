<template>
  <vue-plyr ref="videoPlyr">
    <div class="plyr__video-embed" style="width: 1200px;">
      <iframe
        src="https://www.youtube.com/watch?v=IgcYZhmp_DA?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
        allowfullscreen allowtransparency allow="autoplay">
      </iframe>
    </div>
  </vue-plyr>
</template>

<script>
export default {
  name: 'intro-video',
  data() {
    return {
      url: 'https://www.youtube.com/watch?v=IgcYZhmp_DA', // 默认的播放视频链接
      config: '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media',
    };
  },
};
</script>
