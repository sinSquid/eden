<template>
  <el-row type="flex">
    <el-col :span="8">
      <p class="summ-des">
        openFDA API的过滤参数由&=连接<br/>
        search参数只有一个等号，要搜索的字段和内容之间有一个冒号分隔。<br/>
        search=field:term=:<br/>
      </p>
      <el-table
        :data="ruleData"
        stripe
        size="mini">
        <el-table-column
          v-for="cl of cols"
          :key="cl.key"
          :prop="cl.key"
          :width="cl.width"
          :label="cl.label">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col
      :offset="2"
      :span="10"
      class="summ-exam">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="ep of examples"
          :key="ep.key"
          :name="ep.key"
          class="ui-ta-l"
          :title="ep.title">
          <p>{{ep.description}}</p>
          <p>{{ep.example}}</p>
          <p class="link">
            <i class="el-icon-link"></i>
            {{ep.url}}
          </p>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
import { examples, ruleData } from '../lib/data';

const cols = [
  { key: 'id', width: 50, label: 'ID' },
  { key: 'filter', width: 160, label: '筛选项' },
  { key: 'content', width: 240, label: '解释' },
];

export default {
  name: 'summ-description',
  data() {
    return {
      ruleData,
      cols,
      examples,
      activeNames: [],
    };
  },
};
</script>
