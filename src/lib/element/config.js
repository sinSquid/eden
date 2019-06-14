const elMessageOptions = {
  message: '', // 消息文字——string，不建议用官网VNode
  type: 'info', // 主题——string，分别为：success，warning，info，error，default-info
  customClass: '', // 自定义类名string
  duration: 3000, // 显示时间,毫秒。设为0则不会自动关闭，类型number
  showClose: false, // 是否显示关闭按钮，boolean
  center: false, // 文字是否居中，boolean
  timestamp: 0, // 时间戳
};

const elTagTypes = ['', 'success', 'info', 'warning', 'danger'];
const elBadgeTypes = ['', 'primary', 'success', 'warning', 'danger', 'info'];

const elLoadingOptions = {
  loading: false,
  target: 'document.body',
  lock: false,
  text: 'loading...',
  spinner: 'el-icon-loading',
  background: 'rgba(220,220,220,0.6)',
};

export {
  elMessageOptions,
  elTagTypes,
  elLoadingOptions,
  elBadgeTypes,
};
