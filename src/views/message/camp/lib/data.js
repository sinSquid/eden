const examples = [
  {
    title: '匹配单个搜索词',
    description: '该查询在drug/event端点中查找记录的患者反应之一疲劳的记录。',
    example: '搜索字段patient.reaction.reactionmeddrapt（患者反应）包含疲劳的记录',
    url: 'https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt:"fatigue"&limit=5',
  }, {
    title: '匹配所有搜索字词',
    description: '该查询看在drug/event端点，其中一个记录都疲劳据报道有患者反应，并在事件发生的时间是加拿大的国家。这里的关键是+AND+加入两个搜索词。',
    example: '搜索字段patient.reaction.reactionmeddrapt（患者反应）包含疲劳的记录和occurcountry（事件发生的国家/地区）是ca（加拿大的国家代码）',
    url: 'https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt:"fatigue"+AND+occurcountry:"ca"&limit=1',
  }, {
    title: '匹配任何搜索字词',
    description: '此查询在drug/event端点中查找记录，其中疲劳是报告的患者反应或事件发生的国家是加拿大。',
    example: '搜索字段patient.reaction.reactionmeddrapt（患者反应）包含疲劳的记录或occurcountry（事件发生的国家/地区）为ca（加拿大的国家代码）',
    url: 'https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt:"fatigue"+occurcountry:"ca"&limit=1',
  }, {
    title: '按降序排序',
    description: '此查询在drug/event端点中查找十个记录，并按接收日期按降序对它们进行排序。',
    example: '按字段排序 receivedate',
    url: 'https://api.fda.gov/drug/event.json?sort=receivedate:desc&limit=10',
  }, {
    title: '计算某些术语出现的记录',
    description: '此查询在drug/event端点中查找所有记录。然后它返回最重要的患者反应计数。对于每个反应，匹配的记录数总和，提供有用的摘要。',
    example: '计算与中的术语匹配的记录数patient.reaction.reactionmeddrapt.exact。.exact这里的后缀告诉API计算整个短语（例如注射部位反应）而不是单个词（例如注射，部位和反应）',
    url: 'https://api.fda.gov/drug/event.json?count=patient.reaction.reactionmeddrapt.exact',
  },
];

const ruleData = [
  { id: 0, filter: 'search=field:term', content: '搜索匹配的记录' },
  { id: 1, filter: 'search=field:term+AND+field:term', content: '搜索与两个术语匹配的记录' },
  { id: 2, filter: 'search=field:term+field:term', content: '搜索与两个术语中的任何一个匹配的记录' },
  { id: 3, filter: 'sort=report_date:desc', content: '按特定降序排列记录' },
  { id: 4, filter: 'search=field:term&count=another_field', content: '搜索匹配的记录。然后在该组记录中，计算字段的唯一值出现的次数。' },
];

const foodCols = [
  {
    key: 'date_created', label: '创建日期', width: 120, sort: true, fixed: true,
  },
  { key: 'report_number', label: '报备编号', width: 120 },
  { key: 'age_unit', label: '计时单元', width: 120 },
  { key: 'age', label: '年限', width: 100 },
  { key: 'gender', label: '性别', width: 100 },
];

const drugCols = [
  { key: 'companynumb', label: '公司编号', width: 180 },
  { key: 'fulfillexpeditecriteria', label: '安全等级', width: 100 },
  { key: 'receiptdate', label: '发票日期', width: 120 },
  { key: 'safetyreportid', label: '安全报告编号', width: 120 },
  { key: 'serious', label: '危险性', width: 100 },
];

const todayCols = [
  { key: '_id', label: '编号', width: 240 },
  { key: 'desc', label: '描述', width: 240 },
  { key: 'source', label: '来源', width: 120 },
  { key: 'who', label: '作者', width: 120 },
  { key: 'createdAt', label: '创建时间', width: 180 },
  { key: 'publishedAt', label: '推送时间', width: 160 },
];

const detail = {
  food: foodCols,
  drug: drugCols,
};

export {
  ruleData,
  examples,
  detail,
  todayCols,
};
