/**
 * actions of article
 */
import {
  REQUEST_GET_ARTICLE,
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLE_FAILURE,

  REQUEST_DELETE_ARTICLE,
  REQUEST_DELETE_ARTICLE_FAILURE,
  REQUEST_DELETE_ARTICLE_SUCCESS,

  EDIT_ARTICLE
} from '../actionTypes';
import store from '../store';
import * as servicesArticle from '../services/article';


// 生成action
function createRequestAction(type, defaultMessage = '正在请求数据...') {
  return function (id, message = defaultMessage) {
    let action = {type, id, message};

    store.dispatch(action);
  }
}

// 开始删除
const requestDelete = createRequestAction(REQUEST_DELETE_ARTICLE, '正在删除...');

// 删除成功
const requestDeleteSuccess = createRequestAction(REQUEST_DELETE_ARTICLE_SUCCESS, '请求成功！');

// 删除失败
const requestDeleteFailure = createRequestAction(REQUEST_DELETE_ARTICLE_FAILURE, '删除失败！');


export function del(id, userId) {
  requestDelete(id);
  return servicesArticle.del(id, userId).then(function (article) {
    requestDeleteSuccess(id);
    return article;
  }).catch(function (err) {
    requestDeleteFailure(id);
    throw err;
  });
}



// 开始请求
const requestGet = createRequestAction(REQUEST_GET_ARTICLE);

// 请求成功
const requestGetSuccess = function (data, message = '请求成功！') {
  let action = {
    type: REQUEST_GET_ARTICLE_SUCCESS,
    data,
    message
  };

  store.dispatch(action);
};

// 请求失败
const requestGetFailure = createRequestAction(REQUEST_GET_ARTICLE_FAILURE, '请求失败');


export function getOneById(id) {
  requestGet(id);
  return servicesArticle.getOneById(id).then(function (article) {
    requestGetSuccess(article);
    return article;
  }).catch(function (err) {
    requestGetFailure(id, err.message);
    throw err;
  });
}



export function edit(article) {
  let action = {
    type: EDIT_ARTICLE,
    data: article
  };

  store.dispatch(action);
}
