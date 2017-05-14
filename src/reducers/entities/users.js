import {
  REQUEST_GET_USER_SUCCESS,
  REQUEST_GET_USERS_SUCCESS
} from '../../actionTypes';


export default function users(state = {}, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_USER_SUCCESS:
      let user = action.data;
      let oldUser = nextState[user.id] || {};
      nextState[user.id] = {...oldUser, ...user};
      break;
    case REQUEST_GET_USERS_SUCCESS:
      action.data.map(function (user) {
        let oldUser = nextState[user.id] || {};
        return nextState[user.id] = {...oldUser, ...user};
      });
      break;
  }

  return nextState;
}
