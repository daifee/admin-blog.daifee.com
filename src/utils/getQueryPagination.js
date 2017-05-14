/**
 * 从URL查询参数获取分页参数
 */
import getQuery from './getQuery';
import parseNumber from './parseNumber';

export default function getQueryPagination(defaultPagination) {
  let query = getQuery();
  let pagination = {
    page: parseNumber(query.page, defaultPagination.page),
    per_page: parseNumber(query.per_page, defaultPagination.per_page)
  };

  return pagination;
}
