import moduleAnimals from './animals';
import moduleHealth from './health';
import moduleMessage from './mess';
import moduleUser from './user';

/**
 * @Description: vuex子模块，key必须和菜单子项的parentCode一致（强制约定）
 * @Author: sin
 * @date: 2020/9/29
 */

export default {
  animals: moduleAnimals,
  health: moduleHealth,
  message: moduleMessage,
  user: moduleUser,
};
