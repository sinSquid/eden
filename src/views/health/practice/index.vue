<template>
  <div>
    <el-button @click="loadRender">Start</el-button>
    <ul id="bigshan">
    </ul>
  </div>
</template>

<script>

export default {
  name: 'healPractice',
  data() {
    return {

    };
  },
  methods: {
    sliceGroup(amount) { // amount more than 10k
      const limit = 500;
      const num = _.ceil(amount / limit) - 1;
      const max = _.max(num * limit, amount);
      const arr = [];
      for (let i = 0; i < num; i += 1) {
        arr.push({ s: i, e: i * limit - 1 });
      }
      arr.push({ s: num * limit, e: max });
      return arr;
    },
    async loadAllRender() {
      /* const ul = document.querySelector('#bigshan');
      const aims = document.createElement('li');
      const group = this.sliceGroup(100000);
      for (const gp of group) {
        await this.loadRender(ul, aims, gp);
      } */
    },
    loadRender(target, source, area) {
      let { s } = area;
      const { e } = area;
      const aims = source;
      while (s < e) {
        aims.innerHTML = s;
        target.appendChild(aims);
        s += 1;
      }
    },
  },
};
</script>

<style scoped>

</style>
