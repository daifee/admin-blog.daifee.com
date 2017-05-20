import {
  REQUEST_GET_COMMENT_SUCCESS,
  REQUEST_GET_COMMENTS_SUCCESS,
  REQUEST_DELETE_COMMENT_SUCCESS
} from '../../actionTypes';


export default function comments(state = {}, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_COMMENT_SUCCESS:
      let comment = action.data;
      let oldComment = state[comment.id] || {};
      nextState = {...state};
      nextState[comment.id] = {...oldComment, ...comment};
      break;
    case REQUEST_GET_COMMENTS_SUCCESS:
      nextState = {...state};
      action.data.map(function (comment) {
        let oldComment = nextState[comment.id] || {};
        return nextState[comment.id] = {...oldComment, ...comment};
      });
      break;
    case REQUEST_DELETE_COMMENT_SUCCESS:
      nextState = {...state};
      delete nextState[action.id];
      break;
    default:
      nextState = state;
  }

  return nextState;
}
