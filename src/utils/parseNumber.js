/**
 * 将“字符串number”解析为“number”
 */

export default function (value, optional) {
  value = parseFloat(value, 10);

  if (!isNaN(value)) {
    return value;
  }

  if (typeof optional !== 'undefined') {
    return optional;
  } else {
    return false;
  }
};
