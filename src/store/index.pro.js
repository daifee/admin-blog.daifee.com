/**
 * 配置“生产环境”的store
 */

import {
  createStore
} from 'redux';
import reducers from '../reducers';


export default function getStore(initialState) {
  let store = createStore(reducers, initialState);

  return store;
}
