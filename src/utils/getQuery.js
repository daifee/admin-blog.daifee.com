/**
 * 获取当前URL的查询参数
 */
import qs from 'qs';

export default function getQuery() {
  let search = location.search;
  let query = search.split('?')[1] || '';
  query = qs.parse(query);

  return query;
}
