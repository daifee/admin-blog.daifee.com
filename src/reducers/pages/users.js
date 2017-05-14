import {
  REQUEST_GET_USERS,
  REQUEST_GET_USERS_FAILURE,
  REQUEST_GET_USERS_SUCCESS
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
  page: 1,
  perPage: 20
};


function list(state = DEFAULT_LIST_STATE, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_USERS:
      nextState = {...nextState, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_USERS_FAILURE:
      nextState = {...nextState, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_USERS_SUCCESS:
      let data = action.data.map(function (user) {
        return user.id;
      });

      nextState = {...nextState, ...{
        data: [...data],
        status: 'success',
        page: action.page,
        perPage: action.perPage,
        message: action.message
      }};
      break;
  }

  return nextState;
}
