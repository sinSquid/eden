// dayajs
import dayjs from 'dayjs';

const getters = {
  currentTime() {
    return `${dayjs().year()}:${dayjs().month()}:${dayjs().day()}`;
  },
};
export default getters;
