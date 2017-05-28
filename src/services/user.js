/**
 * user
 */
import config from '../config';
import * as http from '../utils/http';

const {apiHost} = config;

const USERS = `${apiHost}/api/users`;
const SEARCH = `${apiHost}/api/users/search`;
const AUTHENTICATION = `${apiHost}/api`;


// 授权
export function authorize(name, password) {
  let url = AUTHENTICATION;
  return http.post(url, {name, password});
}

// 获取所有用户
export function getList(page, perPage = 20) {
  let url = `${USERS}?page=${page}&per_page=${perPage}`;
  return http.get(url);
}


export function search(query) {
  return http.get(SEARCH, query);
}

// 获取一个用户
export function getOneByName(name) {
  let url = `${USERS}/${name}`;
  return http.get(url);
}

// 创建用户
export function create(user) {
  let url = USERS;
  return http.post(url, user);
}
// 更新用户信息
export function update(id, user) {
  let url = `${USERS}/${id}`;
  return http.patch(url, user);
}

// 删除用户
export function del(id) {
  let url = `${USERS}/${id}`;
  return http.del(url);
}




