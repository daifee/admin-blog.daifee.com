/**
 * 缓存在本地的state，作为initState
 */
const key = 'backend-blog.daifee.com-state';

export function get() {
  let state = localStorage.getItem(key);
  // reducers定义了默认值，但这里要传递undefined
  state = JSON.parse(state) || undefined;

  return state;
}

export function set(store) {
  return function (next) {
    return function (action) {
      next(action);

      let state = store.getState();
      let localState = {
        session: state.session
      };

      localState = JSON.stringify(localState);
      localStorage.setItem(key, localState);
    }
  }
}
