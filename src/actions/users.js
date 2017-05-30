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


function requestSuccess(data, query, message = '请求数据成功！') {
  let action = {
    type: REQUEST_GET_USERS_SUCCESS,
    data,
    query,
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


export function fetch(query) {
  query = {
    ...{
      page: 1,
      per_page: 20
    },
    ...query
  };

  request();

  return servicesUser.search(query).then(function (articles) {
    requestSuccess(articles, query);
    return articles;
  }).catch(function (err) {
    requestFailure(err.message);
    throw err;
  });
}


