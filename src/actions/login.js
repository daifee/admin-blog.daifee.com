import store from '../store';
import {
  LOGIN_INPUT,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,

  LOGOUT
} from '../actionTypes';
import * as servicesUser from '../services/user';


function input(data) {
  let action = {
    type: LOGIN_INPUT,
    data
  };

  store.dispatch(action);
}


/**
 * 输入用户名
 *
 * @export
 * @param {string} [name='']
 */
export function inputName(name = '') {
  input({name});
}

/**
 * 输入密码
 *
 * @export
 * @param {string} [password='']
 */
export function inputPassword(password = '') {
  input({password});
}


export function login(name, password) {
  request();
  return servicesUser.authorize(name, password).then(function (user) {
    requestSuccess(user);
    return user;
  }).catch(function (err) {
    requestFailure(err.message);
    throw err;
  });
}


function request() {
  let action = {
    type: LOGIN_REQUEST,
    message: '正在登录...'
  };

  store.dispatch(action);
}

function requestSuccess(user) {
  let action = {
    type: LOGIN_REQUEST_SUCCESS,
    data: user,
    message: '登录成功！'
  };

  store.dispatch(action);
}

function requestFailure(message) {
  let action = {
    type: LOGIN_REQUEST_FAILURE,
    message: message
  };

  store.dispatch(action);
}


export function logout() {
  let action = {
    type: LOGOUT
  };

  store.dispatch(action);
}
