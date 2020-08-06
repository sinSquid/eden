/**
* @Description: 基于dayjs扩展，避免多次引入day.js
* @Author: SinSquid
* @date: 2019/5/31
* @Params:
* @Return: date
*/
import dayjs from 'dayjs';

function formatData(date, format) {
  return dayjs(date).format(format);
}

// 时间格式化，默认当天
function formatDate(format, date) {
  return dayjs(date || undefined).format(format);
}

// 获取时间戳
function getTimestamp(dateTime) {
  return dayjs(dateTime || undefined).unix();
}

// Unix 时间戳 (秒)
function getSecond(dateTime) {
  return dayjs(dateTime || undefined).unix();
}

// Unix 时间戳 (毫秒)
function getMilliSecond(dateTime) {
  return dayjs(dateTime || undefined).valueOf();
}

// 返回今日与距离今日前几个月
function dateBeforeMon(before) {
  const date = dayjs();
  return [date.subtract(before, 'month').toDate(), date.toDate()];
}

export {
  formatData,
  getTimestamp,
  dateBeforeMon,
  formatDate,
  getSecond,
  getMilliSecond,
};
