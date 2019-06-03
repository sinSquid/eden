<template>
  <div class="cat-breeds">
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <cat-table :data="originData"></cat-table>
      </el-col>
      <el-col :span="8">
        <el-button @click="say()">666</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import catTable from './cat-table.vue';

const rows = ['adaptability', 'child_friendly', 'energy_level', 'health_issues',
  'intelligence', 'shedding_level', 'social_needs', 'vocalisation'];

const chatRow = {
  adaptability: 0,
  child_friendly: 0,
  energy_level: 0,
  health_issues: 0,
  intelligence: 0,
  shedding_level: 0,
  social_needs: 0,
  vocalisation: 0,
};

export default {
  name: 'catBreeds',
  components: {
    catTable,
  },
  data() {
    return {
      rows,
      chatRow,
    };
  },
  computed: {
    ...mapState('moduleAnimals/cat', ['originData']),
  },
  methods: {
    say() {
      const data = this.$refs;
      console.log(data);
    },
  },
};
</script>
