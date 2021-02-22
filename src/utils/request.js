import { request } from 'umi';

export default function _request({
  method = 'GET',
  url,
  data = {},
  responseType,
}) {
  return request(url, { method, data, responseType })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
