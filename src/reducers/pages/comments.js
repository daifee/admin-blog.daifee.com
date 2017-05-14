import {
  REQUEST_GET_COMMENTS,
  REQUEST_GET_COMMENTS_FAILURE,
  REQUEST_GET_COMMENTS_SUCCESS
} from '../../actionTypes';



export default function comments(state = {}, action) {
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
    case REQUEST_GET_COMMENTS:
      nextState = {...nextState, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_COMMENTS_FAILURE:
      nextState = {...nextState, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_COMMENTS_SUCCESS:
      let data = action.data.map(function (comment) {
        return comment.id;
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
