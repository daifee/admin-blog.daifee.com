import {
  REQUEST_DELETE_USER,
  REQUEST_DELETE_USER_SUCCESS,
  REQUEST_DELETE_USER_FAILURE
} from '../actionTypes';
import store from '../store';
import * as servicesUser from '../services/user';


function requestDelete(id, message = '正在删除...') {
  let action = {
    type: REQUEST_DELETE_USER,
    id,
    message
  };

  store.dispatch(action);
}


function requestDeleteSuccess(id, message = '删除成功！') {
  let action = {
    type: REQUEST_DELETE_USER_SUCCESS,
    message,
    id
  };

  store.dispatch(action);
}

function requestDeleteFailure(id, message = '删除失败！') {
  let action = {
    type: REQUEST_DELETE_USER_FAILURE,
    id,
    message
  };

  store.dispatch(action);
}


export function del(id) {
  requestDelete(id);
  return servicesUser.del(id).then(function (user) {
    requestDeleteSuccess(id);
    return user;
  }).catch(function (err) {
    requestDeleteFailure(id);
    throw err;
  });
}
