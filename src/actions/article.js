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

function requestDelete(id, message = '正在删除...') {
  let action = {
    type: REQUEST_DELETE_ARTICLE,
    id,
    message
  };

  store.dispatch(action);
}

function requestDeleteSuccess(id, message = '删除成功！') {
  let action = {
    type: REQUEST_DELETE_ARTICLE_SUCCESS,
    message,
    id
  };

  store.dispatch(action);
}

function requestDeleteFailure(id, message = '删除失败！') {
  let action = {
    type: REQUEST_DELETE_ARTICLE_FAILURE,
    id,
    message
  };

  store.dispatch(action);
}


export function del(id) {
  requestDelete(id);
  return servicesArticle.del(id).then(function (article) {
    requestDeleteSuccess(id);
    return article;
  }).catch(function (err) {
    requestDeleteFailure(id);
    throw err;
  });
}
