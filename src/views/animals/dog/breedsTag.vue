<template>
  <div>
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

export default {
  name: 'breedsTag',
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
