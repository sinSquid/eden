// dayajs
import dayjs from 'dayjs';
import router from '@/router';

const getters = {
  today() {
    return dayjs().format('YYYY:MM:DD');
  },
  route() {
    return router;
  },
};
export default getters;
