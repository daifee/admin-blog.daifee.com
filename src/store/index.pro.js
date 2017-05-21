/**
 * 配置“生产环境”的store
 */

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reducers from '../reducers';
import * as initialState from './initialState';


let enhancer = compose(applyMiddleware(initialState.set));

export default function getStore(initialState) {
  let store = createStore(reducers, initialState, enhancer);

  return store;
}
