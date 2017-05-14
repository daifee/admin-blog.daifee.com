/**
 * article
 */
import config from '../config';
import * as http from '../utils/http';

const {apiHost} = config;

const ARTICLES = `${apiHost}/api/articles`;
const userSnippet = function (userId) {
  return `${apiHost}/api/users/${userId}/articles`;
};


/**
 * 创建一篇文章
 *
 * @export
 * @param {any} userId 管理员ID
 * @param {any} article
 * @returns
 */
export function create(userId, article) {
  let url = userSnippet(userId);
  return http.post(url, article);
}

/**
 * 更新一篇文章
 *
 * @export
 * @param {string} id 文章ID
 * @param {string} userId 管理员ID
 * @param {any} article 文章
 * @returns
 */
export function update(id, userId, article) {
  let url = `${userSnippet(userId)}/${id}`;
  return http.patch(url, article);
}

/**
 * 删除一篇文章
 *
 * @export
 * @param {any} id
 * @param {any} userId 管理员ID
 * @returns
 */
export function del(id, userId) {
  let url = `${userSnippet(userId)}/${id}`;
  return http.del(url);

}

// 获取一篇文章
export function getOneById(id) {
  let url = `${ARTICLES}/${id}`;
  return http.get(url);
}

// 获取所有文章
export function getList(page, perPage = 20) {
  let url = `${ARTICLES}?page=${page}&per_page=${perPage}`;
  return http.get(url);
}

/**
 * 获取某用户的所有文章
 *
 * @export
 * @param {any} userId 用户ID
 * @param {any} page
 * @param {number} [perPage=20]
 */
export function getListByUserId(userId, page, perPage = 20) {
  let url = `${userSnippet(userId)}`;
  return http.get(url);
}
