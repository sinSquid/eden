<template>
  <div class="info-detail">
    <p v-for="bf of info.brief"
      :key="bf"
      class="ui-mb-10">
      {{ `${bf}: ${detail[bf]}` }}
    </p>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="dt of info.detail"
        :key="dt.key"
        :name="dt.key"
        :title="dt.key">
        <template
          v-if="dt.iterable">
          <p
            v-for="(con, index) of detail[dt.key]"
            :key="index"
            class="ui-mb-5">
            {{ con }}
          </p>
        </template>
        <template v-else>
          <p
            v-for="(key, index) of Object.entries(detail[dt.key])"
            :key="index">
            {{ `${key}` }}
          </p>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'info-detail',
  data() {
    return {
      activeNames: [],
    };
  },
  computed: {
    ...mapState('moduleHealth/doctor', ['detail']),
    info() {
      const data = { brief: [], detail: [] };
      for (const [key, value] of _.toPairs(this.detail)) {
        if (_.isObject(value)) {
          const iterable = _.isArray(value);
          data.detail.push({ key, iterable });
        } else {
          data.brief.push(key);
        }
      }
      return data;
    },
  },
};
</script>
