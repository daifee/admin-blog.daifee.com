

import {
  LOGIN_REQUEST_SUCCESS
} from '../actionTypes';


export default function session(state = null, action) {
  let nextState = state;

  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      nextState = action.data;
    break;
  }

  return nextState;
}
