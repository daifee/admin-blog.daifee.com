/**
 * http请求，统一返回promise对象，而且resolve和reject的value也规范化
 * Promise.resolve(response.json());
 * Promise.reject(new HTTPError(message, code, status, responseBody));
 */
import store from '../store';
import qs from 'qs';

/**
 * http层自定义的异常
 *
 * @class HTTPError
 * @extends {Error}
 */
class HTTPError extends Error {

  /**
   * Creates an instance of HTTPError.
   * @param {string} message statusText
   * @param {number} http状态码
   * @param {object} [body=null] http响应体
   *
   * @memberof HTTPError
   */
  constructor(message, status, body = null) {
    if (body && body.message) {
      message = body.message;
    }

    super(message);
    this.status = status;
    this.body = body;

    this.name = 'HTTPError';
  }
}


/**
 * 封装fetch请求，只可返送JSON数据和接收JSON数据
 *
 * @param {string} method 请求的方法
 * @param {string} [url=''] url 请求的URL
 * @param {object|string} body 请求的数据体，必须是JSON或json object
 * @returns {object} promise 返回promise对象
 * promise.resolve(JSON.parse(response))
 * promise.reject(error);
 */
function http(method, url = '', body) {
  let headers = {};

  // 将json object转化为JSON
  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  // 携带token
  let session = store.getState().session;
  if (session && session.token) {
    headers['X-Token'] = session.token;
  }

  return fetch(url, {method, headers, body}).then(function (response) {
    let status = response.status;
    let statusText = response.statusText;

    return response.json().then(function (body) {
      if (status >= 200 && status < 300) {
        return body;
      } else {
        throw new HTTPError(statusText, status, body);
      }
    });
  }).catch(function (err) {
    if (err.name === 'HTTPError') {
      throw err;
    }

    throw new HTTPError(err.message, 400);
  });
}


export function get(url, query) {
  if (query) {
    query = qs.stringify(query);
    url += url.indexOf('?') === -1 ? `?${query}` : `&${query}`;
  }

  return http('GET', url);
}

export function del(url) {
  return http('DELETE', url);
}

export function post(url, body) {
  return http('POST', url, body);
}

export function patch(url, body) {
  return http('PATCH', url, body);
}

export function put(url, body) {
  return http('PUT', url, body);
}

// export function
