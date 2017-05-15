import {
  REQUEST_GET_USER_SUCCESS,
  REQUEST_GET_USERS_SUCCESS,
  REQUEST_DELETE_USER_SUCCESS
} from '../../actionTypes';


export default function users(state = {}, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_USER_SUCCESS:
      let user = action.data;
      let oldUser = state[user.id] || {};
      nextState = {...state};
      nextState[user.id] = {...oldUser, ...user};
      break;
    case REQUEST_GET_USERS_SUCCESS:
      nextState = {...state};
      action.data.map(function (user) {
        let oldUser = nextState[user.id] || {};
        return nextState[user.id] = {...oldUser, ...user};
      });
      break;
    case REQUEST_DELETE_USER_SUCCESS:
      nextState = {...state};
      delete nextState[action.id];
      break;
    default:
      nextState = state;
  }

  return nextState;
}
