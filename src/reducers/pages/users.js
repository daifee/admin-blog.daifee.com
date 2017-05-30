import {
  REQUEST_GET_USERS,
  REQUEST_GET_USERS_FAILURE,
  REQUEST_GET_USERS_SUCCESS,
  REQUEST_DELETE_USER,
  REQUEST_DELETE_USER_SUCCESS,
  REQUEST_DELETE_USER_FAILURE
} from '../../actionTypes';



export default function users(state = {}, action) {
  return {
    list: list(state.list, action)
  };
}


const DEFAULT_LIST_STATE = {
  data: [],
  status: 'init',
  message: '',
  query: {
    page: 1,
    per_page: 20
  }
};


function list(state = DEFAULT_LIST_STATE, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_USERS:
    case REQUEST_DELETE_USER:
      nextState = {...state, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_USERS_FAILURE:
    case REQUEST_DELETE_USER_FAILURE:
      nextState = {...state, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_USERS_SUCCESS:
      nextState = getUsersSuccess(state, action);
      break;
    case REQUEST_DELETE_USER_SUCCESS:
      nextState = deleteUserSuccess(state, action);
      break;
    default:
      nextState = state;
  }

  return nextState;
}

function getUsersSuccess(state, action) {
  let data = action.data.map(function (user) {
    return user.id;
  });

  let nextState = {...state, ...{
    data: [...data],
    status: 'success',
    query: {...action.query},
    message: action.message
  }};

  return nextState;
}


function deleteUserSuccess(state, action) {
  let nextState = {...state, ...{
    status: 'success',
    message: action.message
  }};

  nextState.data = nextState.data.filter(function (item) {
    return item !== action.id;
  });

  return nextState;
}
