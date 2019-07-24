<template>
  <div>
    <el-button @click="loadAllRender">Start</el-button>
    <el-button @click="scheduler">Gen</el-button>
    <ul id="bigshan">
    </ul>
  </div>
</template>

<script>

export default {
  name: 'test',
  data() {
    return {
      target: '',
      limit: {
        s: 0,
        e: 0,
      },
      area: [],
    };
  },
  methods: {
    sliceGroup(amount) { // amount more than 10k
      const limit = 10;
      const num = _.ceil(amount / limit) - 1;
      const max = _.max([num * limit, amount]);
      const arr = [];
      for (let i = 0; i < num; i += 1) {
        arr.push({ s: i * limit, e: (i + 1) * limit - 1 });
      }
      arr.push({ s: num * limit, e: max });
      this.area = arr;
      this.limit.e = arr.length;
    },
    loadAllRender() {
      this.target = document.getElementById('bigshan');
      this.sliceGroup(100000);
      this.cycleRender();
    },
    loadRender() {
      const area = this.area[this.limit.s];
      let { s } = area;
      const { e } = area;
      const fragment = document.createDocumentFragment();
      while (s < e) {
        const aims = document.createElement('li');
        aims.innerHTML = s;
        fragment.appendChild(aims);
        s += 1;
      }
      this.target.appendChild(fragment);
      this.limit.s += 1;
      this.cycleRender();
    },
    cycleRender() {
      const { s, e } = this.limit;
      if (s < e) {
        window.requestAnimationFrame(this.loadRender);
      }
    },
    genLoadRender(target, area) {
      let { s } = area;
      const { e } = area;
      const fragment = document.createDocumentFragment();
      while (s <= e) {
        const aims = document.createElement('li');
        aims.innerHTML = s;
        fragment.appendChild(aims);
        s += 1;
      }
      if (target) {
        target.append(fragment);
      } else {
        const parent = document.getElementById('bigshan');
        parent.appendChild(fragment);
      }
      const aims = document.createElement('li');
      aims.innerHTML = e;
      return aims;
    },
    genSliceGroup(amount) { // amount more than 10k
      const limit = 10;
      const num = _.ceil(amount / limit) - 1;
      const max = _.max([num * limit, amount]);
      const arr = [];
      for (let i = 0; i < num; i += 1) {
        arr.push({ index: i, s: i * limit, e: (i + 1) * limit - 1 });
      }
      arr.push({ index: num, s: num * limit, e: max });
      return arr;
    },
    * genLoadAllRender() {
      const groups = this.genSliceGroup(500000);
      const scheduler = [];
      try {
        for (const gp of groups) {
          scheduler[gp.index] = yield this.genLoadRender(scheduler[gp.index - 1], gp);
        }
      } catch (e) {
        // console.log(e);
      }
    },
    schedulerLoad(task) {
      setTimeout(() => {
        const taskObj = task.next(task.value);
        if (!taskObj.done) {
          const aims = _.cloneDeep(task);
          aims.value = taskObj.value;
          this.schedulerLoad(task);
        }
      }, 0);
    },
    scheduler() {
      const task = this.genLoadAllRender();
      this.schedulerLoad(task);
    },
  },
};
</script>
