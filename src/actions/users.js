import store from '../store';
import {
  REQUEST_GET_USERS,
  REQUEST_GET_USERS_SUCCESS,
  REQUEST_GET_USERS_FAILURE
} from '../actionTypes';
import * as servicesUser from '../services/user';


function request(message = '请求数据...') {
  let action = {
    type: REQUEST_GET_USERS,
    message
  };

  store.dispatch(action);
}


function requestSuccess(data, page, perPage, message = '请求数据成功！') {
  let action = {
    type: REQUEST_GET_USERS_SUCCESS,
    data,
    page,
    perPage,
    message
  };

  store.dispatch(action);
}

function requestFailure(message = '请求数据失败！') {
  let action = {
    type: REQUEST_GET_USERS_FAILURE,
    message
  };

  store.dispatch(action);
}


export function fetch(page, perPage = 20) {
  request();

  return servicesUser.getList(page, perPage).then(function (articles) {
    requestSuccess(articles, page, perPage);
    return articles;
  }).catch(function (err) {
    requestFailure(err.message);
    throw err;
  });
}


