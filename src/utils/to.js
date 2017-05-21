import config from '../config';
const {publicUrl} = config;


export default function (url) {
  return publicUrl + url;
}
