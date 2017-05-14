/**
 * store
 */
import * as initialState from './initialState';

let state = initialState.get();
let getStore;

if (process.env.NODE_ENV === 'development') {
  getStore = require('./index.dev').default;
} else {
  getStore = require('./index.pro').default;
}

const store = getStore(state);

export default store;
