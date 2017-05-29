import store from '../store';
import {
  REQUEST_GET_ARTICLES,
  REQUEST_GET_ARTICLES_FAILURE,
  REQUEST_GET_ARTICLES_SUCCESS
} from '../actionTypes';
import * as servicesArticle from '../services/article';


function request(message = '请求数据...') {
  let action = {
    type: REQUEST_GET_ARTICLES,
    message
  };

  store.dispatch(action);
}

function requestSuccess(data, page, perPage, message = '请求数据成功！') {
  let action = {
    type: REQUEST_GET_ARTICLES_SUCCESS,
    data,
    page,
    perPage,
    message
  };

  store.dispatch(action);
}

function requestFailure(message = '请求数据失败！') {
  let action = {
    type: REQUEST_GET_ARTICLES_FAILURE,
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

  return servicesArticle.search(query).then(function (articles) {
    requestSuccess(articles, query.page, query.perPage);
    return articles;
  }).catch(function (err) {
    requestFailure(err.message);
    throw err;
  });
}
