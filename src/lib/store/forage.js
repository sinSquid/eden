import localForage from 'localforage';

/**
* @Description: 'localForage，详见：https://localForage.docschina.org/#api'
* @Author: sinSquid
* @date: 2019/7/5
*/
const webStore = localForage.createInstance({
  /* Force WebSQL; same as using setDriver()
  [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE] */
  driver: localForage.WEBSQL,
  name: 'eden-web',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'edenWebStore', // Should be alphanumeric, with underscores.
  description: 'webStore for eden',
});

const dbStore = localForage.createInstance({
  driver: localForage.INDEXEDDB,
  name: 'eden-db',
  version: 1.0,
  size: 19922944,
  storeName: 'edenDBStore',
  description: 'dbStore(INDEXEDDB) for eden',
});

const localStore = localForage.createInstance({
  driver: localForage.LOCALSTORAGE,
  name: 'eden-local',
  version: 1.0,
  size: 4980736,
  storeName: 'edenLocalStore',
  description: 'localStore for eden',
});

export {
  webStore,
  dbStore,
  localStore,
};
