/**
 * 获取响应message
 */

export default function getResponseMessage(err) {
  return err.body ? err.body.message : err.message;
}
