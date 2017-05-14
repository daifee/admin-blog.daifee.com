/**
 * 配置“开发环境”的store
 */

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reduxLogger from 'redux-logger';
import reducers from '../reducers';
import * as initialState from './initialState';

let enhancer;

if (window.devToolsExtension) {
  enhancer = compose(applyMiddleware(initialState.set), window.devToolsExtension());
} else {
  enhancer = compose(applyMiddleware(reduxLogger(), initialState.set));
}

export default function getStore(initialState) {
  let store = createStore(reducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', function () {
      let newReducers = require('../reducers');
      store.replaceReducer(newReducers);
    });
  }

  return store;
}
