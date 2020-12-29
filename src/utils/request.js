import { request } from 'umi';

export default function _request ({ method = 'GET', url, data = {} }) {
  return request(url, { method, data }).then(response => {
    return response;
  }).catch(error => {
    console.log(error);
  })
}