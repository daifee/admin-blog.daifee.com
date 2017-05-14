import {
  LOGIN_INPUT,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from '../../actionTypes';


const DEFAULT_STATE = {
  data: {
    name: '',
    password: ''
  },
  status: 'init',
  message: ''
};


export default function login(state = DEFAULT_STATE, action) {
  let nextState = state;

  switch (action.type) {
    case LOGIN_INPUT:
      nextState.data = {...nextState.data, ...action.data};
      break;
    case LOGIN_REQUEST:
      nextState = {...nextState, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case LOGIN_REQUEST_SUCCESS:
      nextState = {...nextState, ...{
        status: 'success',
        message: action.message
      }};
      break;
    case LOGIN_REQUEST_FAILURE:
      nextState = {...nextState, ...{
        status: 'failure',
        message: action.message
      }};
      break;
  }

  return nextState;
}
