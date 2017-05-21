

import {
  LOGIN_REQUEST_SUCCESS,
  LOGOUT
} from '../actionTypes';


export default function session(state = null, action) {
  let nextState;

  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      nextState = action.data;
      break;
    case LOGOUT:
      nextState = null;
      break;
    default:
      nextState = state;
  }

  return nextState;
}
