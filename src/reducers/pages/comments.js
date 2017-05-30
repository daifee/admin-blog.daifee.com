import {
  REQUEST_GET_COMMENTS,
  REQUEST_GET_COMMENTS_FAILURE,
  REQUEST_GET_COMMENTS_SUCCESS,

  REQUEST_DELETE_COMMENT,
  REQUEST_DELETE_COMMENT_SUCCESS,
  REQUEST_DELETE_COMMENT_FAILURE
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
  query: {
    page: 1,
    per_page: 20
  }
};


function list(state = DEFAULT_LIST_STATE, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_COMMENTS:
    case REQUEST_DELETE_COMMENT:
      nextState = {...state, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_COMMENTS_FAILURE:
    case REQUEST_DELETE_COMMENT_FAILURE:
      nextState = {...state, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_COMMENTS_SUCCESS:
      nextState = getCommentsSuccess(state, action);
      break;
    case REQUEST_DELETE_COMMENT_SUCCESS:
      nextState = deleteCommentSuccess(state, action);
      break;
    default:
      nextState = state;
  }

  return nextState;
}


function getCommentsSuccess(state, action) {
  let data = action.data.map(function (comment) {
    return comment.id;
  });

  let nextState = {...state, ...{
    data: [...data],
    status: 'success',
    query: {...action.query},
    message: action.message
  }};

  return nextState;
}


function deleteCommentSuccess(state, action) {
  let nextState = {...state, ...{
    status: 'success',
    message: action.message
  }};

  nextState.data = nextState.data.filter(function (item) {
    return item !== action.id;
  });

  return nextState;
}
