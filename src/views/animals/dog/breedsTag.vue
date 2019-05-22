<template>
  <div class="ui-ml-20 ui-mr-20">
    <divider-collapse :data="dividerCollapse">
    </divider-collapse>
    <el-tag
      v-for="eb in displayTags"
      :key="eb.value"
      :type="eb.type"
      class="ui-mr-10 ui-mb-10">
      {{ eb.value }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { tagTypes } from '@/lib/element/config';
import dividerCollapse from '@/components/divider-collapse/index.vue';

export default {
  name: 'breedsTag',
  components: {
    dividerCollapse,
  },
  data() {
    return {
      dividerCollapse: {
        divider: {
          title: 'color tag',
        },
        collapse: [{
          title: 'tag内容介绍',
          content: '此处包含https://dog.ceo/dog-api/已存在dog的种类',
        }],
      },
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['existBreeds']),

    displayTags() {
      const tags = [];
      this.existBreeds.forEach((e) => {
        const index = Math.floor(e.codePointAt(e.length - 1) % 5);
        tags.push({
          type: tagTypes[index],
          value: e,
        });
      });
      return tags;
    },
  },
};
</script>

<style scoped>

</style>
