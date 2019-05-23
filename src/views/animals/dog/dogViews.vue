<template>
  <div>
    <el-row type="flex" justify="start">
      <el-col :span="4">
        <el-cascader
          expand-trigger="hover"
          filterable
          placeholder="请选择你的狗子"
          :options="cascadeOptions"
          v-model="selectedOptions"
          :before-filter="value => /[a-zA-Z]/gu.test(value) || !value"
          @change="fetchDogByBreed()">
        </el-cascader>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="9">
        <el-image :fit="viewsFit" :src="breedDogUrl">
          <div slot="placeholder" class="image-slot">
            loading<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'dogViews',
  data() {
    return {
      selectedOptions: [],
      // 'fill', 'contain', 'cover', 'none', 'scale-down'
      viewsFit: 'contain',
      breedDogUrl: '',
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['cascadeOptions']),
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getRandomDog', 'getRandomDogByBreed']),

    fetchDogByBreed() {
      const breed = this.selectedOptions.join('/');
      this.getRandomDogByBreed(breed).then((response) => {
        if (response.status === 'success') {
          this.breedDogUrl = response.message;
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
