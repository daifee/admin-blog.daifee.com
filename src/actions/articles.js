/**
 * actions of articles
 */
import store from '../store';
import {
  REQUEST_GET_ARTICLES,
  REQUEST_GET_ARTICLES_FAILURE,
  REQUEST_GET_ARTICLES_SUCCESS
} from '../actionTypes';
import * as servicesArticle from '../services/article';


function requestGetArticles(message = '正在请求数据...') {
  let action = {
    type: REQUEST_GET_ARTICLES,
    message
  };

  store.dispatch(action);
}

function requestGetArticlesSuccess(data, page, perPage, message = '操作成功') {
  let action = {
    type: REQUEST_GET_ARTICLES_SUCCESS,
    data,
    page,
    perPage,
    message
  };

  store.dispatch(action);
}

function requestGetArticlesFailure(message = '请求数据失败！') {
  let action = {
    type: REQUEST_GET_ARTICLES_FAILURE,
    message
  };

  store.dispatch(action);
}


export function fetch(page, perPage = 20) {
  requestGetArticles();

  return servicesArticle.getList(page, perPage).then(function (articles) {
    requestGetArticlesSuccess(articles, page, perPage, '成功获取文章列表');
    return articles;
  }).catch(function (err) {
    requestGetArticlesFailure(err.message);
    throw err;
  });
}
