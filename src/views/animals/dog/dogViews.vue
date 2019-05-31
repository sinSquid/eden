<template>
  <div class="dog-views">
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
      <el-col :span="4" :offset="8">
        <el-button
          size="small"
          type="warning"
          @click="randomOnlyDog">Random</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="4">
        <el-image :fit="viewsFit" :src="breedDogUrl">
          <div slot="placeholder" class="image-slot">
            loading<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-col>
      <el-col :span="6" :offset="4">
        <el-image :fit="viewsFit" :src="randomDogUrl">
          <div slot="placeholder" class="image-slot">
            loading<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <el-table
      :v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%">
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'dogViews',
  data() {
    return {
      selectedOptions: [],
      // 图片fit可选'fill', 'contain', 'cover', 'none', 'scale-down'
      viewsFit: 'contain',
      breedDogUrl: '',
      randomDogUrl: '',
      loading: true,
    };
  },
  computed: {
    ...mapState('moduleAnimals/dog', ['cascadeOptions']),
  },
  methods: {
    ...mapActions('moduleAnimals/dog', ['getRandomDog', 'getRandomDogByBreed']),

    fetchDogByBreed() {
      const breed = this.selectedOptions.join('/');
      this.getRandomDogByBreed(breed)
        .then((response) => {
          if (response.status === 'success') {
            this.breedDogUrl = response.message;
          }
        });
    },
    randomOnlyDog() {
      this.getRandomDog()
        .then((response) => {
          if (response.status === 'success') {
            this.randomDogUrl = response.message;
          }
        });
    },
  },
};
</script>
