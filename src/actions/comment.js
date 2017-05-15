import {
  REQUEST_DELETE_COMMENT,
  REQUEST_DELETE_COMMENT_SUCCESS,
  REQUEST_DELETE_COMMENT_FAILURE
} from '../actionTypes';
import store from '../store';
import * as servicesComment from '../services/comment';



function requestDelete(id, message = '正在删除...') {
  let action = {
    type: REQUEST_DELETE_COMMENT,
    id,
    message
  };

  store.dispatch(action);
}


function requestDeleteSuccess(id, message = '删除成功！') {
  let action = {
    type: REQUEST_DELETE_COMMENT_SUCCESS,
    id,
    message
  };

  store.dispatch(action);
}



function requestDeleteFailure(id, message = '删除失败！') {
  let action = {
    type: REQUEST_DELETE_COMMENT_FAILURE,
    id,
    message
  };

  store.dispatch(action);
}


export function del(id, userId) {
  requestDelete(id);
  return servicesComment.del(userId, id).then(function (comment) {
    requestDeleteSuccess(id);
    return comment;
  }).catch(function (err) {
    requestDeleteFailure(id);
    throw err;
  });
}
