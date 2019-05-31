/**
* @Description: 基于dayjs扩展，避免多次引入day.js
* @Author: SinSquid
* @date: 2019/5/31
* @Params:
* @Return: date
*/
import dayjs from 'dayjs';

function getToday() {
  return dayjs().format('YYYY:MM:DD');
}

function getTimestamp() {
  return dayjs().unix();
}

export {
  getToday,
  getTimestamp,
};
