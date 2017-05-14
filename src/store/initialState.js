/**
 * 缓存在本地的state，作为initState
 */
const key = 'backend-blog.daifee.com-state';

export function get() {
  let state = localStorage.getItem(key);
  state = JSON.parse(state) || {};

  return state;
}

export function set(store) {
  return function (next) {
    return function (action) {
      next(action);

      let state = store.getState();
      state = JSON.stringify(state);

      localStorage.setItem(key, state);
    }
  }
}
