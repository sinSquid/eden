// dayajs
import dayjs from 'dayjs';
import router from '@/router';

const getters = {
  currentTime() {
    return `${dayjs().year()}:${dayjs().month()}:${dayjs().day()}`;
  },
  me() {
    return router;
  },
};
export default getters;
