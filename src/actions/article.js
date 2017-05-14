/**
 * actions of article
 */
import {
  REQUEST_DELETE_ARTICLE,
  REQUEST_DELETE_ARTICLE_FAILURE,
  REQUEST_DELETE_ARTICLE_SUCCESS
} from '../actionTypes';
import store from '../store';
import * as servicesArticle from '../services/article';

export function requestDeleteArticle(id, message = '正在删除') {
  let action = {
    type: REQUEST_DELETE_ARTICLE,
    id,
    message
  };

  store.dispatch(action);
}

export function requestDeleteArticleSuccess(id, message = '操作成功') {
  let action = {
    type: REQUEST_DELETE_ARTICLE_SUCCESS,
    message,
    id
  };

  store.dispatch(action);
}

export function requestDeleteArticleFailure(id, message = '操作失败') {
  let action = {
    type: REQUEST_DELETE_ARTICLE_FAILURE,
    id,
    message
  };

  store.dispatch(action);
}


export function deleteById(id) {
  requestDeleteArticle(id);
  return servicesArticle.deleteById(id).then(function (article) {
    requestDeleteArticleSuccess(id);
    return article;
  }).catch(function (err) {
    requestDeleteArticleFailure(id);
    throw err;
  });
}
