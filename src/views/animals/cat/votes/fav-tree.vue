<template>
  <div class="fav-tree ui-mt-40">
    <el-input
      v-model="search"
      :maxlength="15"
      placeholder="输入过滤内容"
      show-word-limit
      class="search-btn ui-mb-40"
      clearable
      :disabled="loading"
      @keyup.enter.native="innerGetFavourites">
    </el-input>
    <div>
      <el-badge
        v-for="bd in data"
        :key="bd.label"
        :max="10"
        :type="bd.type"
        class="ui-mr-20"
        effect="plain"
        :value="bd.len">
        <el-button
          :type="bd.type"
          icon="el-icon-folder-opened">
          {{ bd.label }}
        </el-button>
      </el-badge>
    </div>
    <el-tree
      :data="data"
      lazy
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      :load="loadNode"
      node-key="id"
      ref="favTree"
      icon-class="el-icon-position"
      highlight-current
      show-checkbox
      :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            class="ui-ml-10"
            type="text"
            v-if="data.isLeaf"
            @click="removeNode(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { elBadgeTypes } from '@/lib/element/config';

export default {
  name: 'fav-tree',
  data() {
    return {
      loading: false,
      originData: [],
      data: [],
      search: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf',
      },
    };
  },
  methods: {
    ...mapMutations(['setGlobalMessage']),
    ...mapActions('moduleAnimals/cat', ['getFavourites', 'deleteFavourite']),
    innerGetFavourites() {
      this.loading = true;
      this.getFavourites({ sub_id: this.search })
        .then((response) => {
          this.formatData(response);
        })
        .catch((error) => {
          this.setGlobalMessage({ message: error.response.data.message || '获取收藏夹失败', type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatData(arr) {
      const obj = {};
      const data = [];
      const len = elBadgeTypes.length - 1;
      arr.forEach((e) => {
        const key = e.sub_id ? e.sub_id : 'unix';
        if (_.hasIn(obj, key)) {
          obj[key].len += 1;
          obj[key].children.push({ id: e.id, label: e.image_id, isLeaf: true });
        } else {
          const index = _.random(len);
          obj[key] = {
            id: e.created_at,
            label: key,
            len: 1,
            isLeaf: false,
            type: elBadgeTypes[index],
            children: Array.of({ id: e.id, label: e.image_id, isLeaf: true }),
          };
        }
      });
      _.keys(obj).forEach((key) => {
        data.push(obj[key]);
      });
      this.data = data;
    },
    loadNode(node, resolve) {
      setTimeout(() => {
        const index = this.data.findIndex((e) => e.label === node.data.label);
        const data = _.isEmpty(this.data) ? [] : this.data[index].children;
        resolve(data);
      }, 300);
    },
    removeNode(node, data) {
      this.loading = true;
      this.deleteFavourite(data.id)
        .then((response) => {
          const { message } = response;
          if (message === 'SUCCESS') {
            const { parent } = node;
            const children = parent.data.children || parent.data;
            const index = children.findIndex((d) => d.id === data.id);
            children.splice(index, 1);
            const arr = _.cloneDeep(children);
            this.$refs.favTree.updateKeyChildren(parent.data.id, arr);
          }
        })
        .catch((error) => {
          this.setGlobalMessage({ message: error.response.data.message || '移除收藏夹失败', type: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
