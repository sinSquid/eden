<template>
  <div class="home-frame">
    <Plyr
      :options="options"
      ref="plyr">
      <div
        class="plyr__video-embed"
        id="player"
        style="width: 1480px;">
        <iframe
          :src="`https://www.youtube.com/embed/${url}`"
          allowfullscreen
          allowtransparency
          allow="autoplay">
        </iframe>
      </div>
    </Plyr>
    <div class="intro">
      <div class="info-plyr">
        <i
          class="el-icon-s-fold cus-icon-24"
          @click="openList">
        </i>
        <span>more for plyr, open it!</span>
      </div>
      <div :class="['recommend-list', loading ? 'forbidden' : '']">
        <div
          v-for="{ id, uri, unique, play } of infoList"
          :key="id"
        >
          <el-image
            style="width: 100%;"
            :src="uri"
            fit="fill"
            lazy
            @click="changeVideo(unique)"
            alt="not found" />
          <span class="play-volume">
            {{play}}次观看
          </span>
        </div>
      </div>
    </div>
    <intro-list
      :visible.sync="listVisible" />
  </div>
</template>

<script>
import Plyr from '@/components/plyr/index.vue';
import { getAllVideoInfo } from '@/apis/system';
import introList from './list.vue';

export default {
  name: 'intro',
  components: {
    Plyr,
    introList,
  },
  data() {
    return {
      listVisible: false,
      url: 'IgcYZhmp_DA', // 默认的播放视频链接
      infoList: [],
      loading: false,
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    },
    options() {
      return {
        source: {
          type: 'video',
          sources: [
            {
              src: this.url,
              provider: 'youtube',
            },
          ],
        },
        // 配置详见https://developers.google.com/youtube/player_parameters#Parameters
        youtube: {
          noCookie: false,
          rel: 0,
          iv_load_policy: 1,
          modestbranding: 1,
          enablejsapi: 1,
          disablekb: 0,
        },
      };
    },
  },
  methods: {
    openList() {
      this.listVisible = true;
    },
    getVideoInfo() {
      getAllVideoInfo()
        .then((res) => {
          this.infoList = res;
        });
    },
    changeVideo(key) {
      this.url = key;
      this.loading = true;
      this.$nextTick(() => {
        this.player.resource();
        setTimeout(() => {
          this.loading = false;
        }, 8 * 1000);
      });
    },
  },
  mounted() {
    this.getVideoInfo();
  },
};
</script>

<style lang="less" scoped>
.home-frame {
  display: flex;
  flex: 1;
  margin-top: 10px;
  margin-left: 10px;
  .intro {
    margin-left: 20px;
    width: 100%;
    .info-plyr {
      display: flex;
      flex: 1;
      align-items: center;
      margin-bottom: 20px;
      span {
        color: #409EFF;
      }
    }
    .recommend-list {
      max-height: 760px;
      overflow-y: auto;
      text-align: left;
      .el-image {
        cursor: pointer;
      }
      &.forbidden {
        user-select: none;
        filter: grayscale(1);
        background: #ccc;
        pointer-events: none;
        opacity: 0.6;
        cursor: not-allowed;
      }
      .play-volume {
        margin-left: 10px;
        color: #ff6c02;
        font-size: 18px;
      }
    }

  }
}
</style>
