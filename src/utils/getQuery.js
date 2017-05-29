/**
 * 获取当前URL的查询参数
 */
import qs from 'qs';

export default function getQuery() {
  let search = window.location.search;
  let query = search.split('?')[1] || '';
  query = qs.parse(query);

  if (query.page) {
    query = {
      ...query,
      page: query.page * 1
    };
  }

  if (query.per_page) {
    query = {
      ...query,
      per_page: query.per_page * 1
    };
  }

  return query;
}
