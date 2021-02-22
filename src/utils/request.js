import { request } from 'umi';

export default function _request({
  method = 'GET',
  url,
  data = {},
  responseType,
}) {
  return request(url, { method, data, responseType, getResponse: true }).then(
    (res) => {
      if (responseType == 'blob') {
        return res;
      }
      return res.data;
    },
  );
}
