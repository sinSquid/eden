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

function getTimestamp() {
  return dayjs().unix();
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
};
