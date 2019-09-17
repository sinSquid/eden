<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default {
  name: 'plyr',
  props: {
    // 配置参数
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    // 冒泡事件
    emit: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      player: {},
    };
  },
  mounted() {
    this.player = new Plyr(this.$el.firstChild, this.opts);
    this.$emit('player', this.player);
    this.emit.forEach((element) => {
      this.player.on(element, this.emitPlayerEvent);
    });
  },
  beforeDestroy() {
    try {
      this.player.destroy();
    } catch (e) {
      if (!(this.opts.hideYouTubeDOMError
        && e.message === 'The YouTube player is not attached to the DOM.')) {
        // 重置播放器
        this.player.restart();
      }
    }
  },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    },
  },
  computed: {
    opts() {
      const { options } = this;
      if (_.has(this.options, 'hideYouTubeDOMError')) {
        options.hideYouTubeDOMError = true;
      }
      return options;
    },
  },
};
</script>
