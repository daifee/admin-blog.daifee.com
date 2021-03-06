/**
 * article
 */
import config from '../config';
import * as http from '../utils/http';

const {apiHost} = config;

const COMMENTS = `${apiHost}/api/comments`;
const SEARCH = `${apiHost}/api/comments/search`;
const userSnippet = function (userId) {
  return `${apiHost}/api/users/${userId}/comments`;
};
const articleSnippet = function (articleId) {
  return `${apiHost}/api/articles/${articleId}/comments`;
};


// 创建评论
export function create(userId, comment) {
  let url = `${userSnippet(userId)}`;
  return http.post(url, comment);
}

// 删除评论
export function del(userId, id) {
  let url = `${userSnippet(userId)}/${id}`;
  return http.del(url);
}

// 获取一条评论
export function getById(id) {
  let url = `${COMMENTS}/${id}`;
  return http.get(url);
}

// 获取所有评论
export function getList(page, per_page) {
  let url = `${COMMENTS}?page=${page}&per_page=${per_page}`;
  return http.get(url);
}


export function search(query) {
  return http.get(SEARCH, query);
}

// 获取某用户的所有评论
export function getListByUserId(userId, page, per_page) {
  let url = `${userSnippet(userId)}?page=${page}&per_page=${per_page}`;
  return http.get(url);
}

// 获取某文章的所有评论
export function getListByArticleId(articleId, page, per_page) {
  let url = `${articleSnippet(articleId)}?page=${page}&per_page=${per_page}`;
  return http.get(url);
}
