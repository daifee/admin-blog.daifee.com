import {
  REQUEST_GET_COMMENT_SUCCESS,
  REQUEST_GET_COMMENTS_SUCCESS
} from '../../actionTypes';


export default function comments(state = {}, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_COMMENT_SUCCESS:
      let comment = action.data;
      let oldComment = nextState[comment.id] || {};
      nextState[comment.id] = {...oldComment, ...comment};
      break;
    case REQUEST_GET_COMMENTS_SUCCESS:
      action.data.map(function (comment) {
        let oldComment = nextState[comment.id] || {};
        return nextState[comment.id] = {...oldComment, ...comment};
      });
      break;
    default:
      // eslint-disable-line
  }

  return nextState;
}
