import _request from './request';
import { WECHAT_PLATFORM_API } from 'config';
import { download } from 'common';

export const InvokeApi = async (method, aUrl, data, responseType) => {
  // 添加基地址
  let url = WECHAT_PLATFORM_API + aUrl;
  return _request({ method, url, data, responseType });
};
export const Get = (url) => {
  return InvokeApi('GET', url);
};
export const Post = (url, data) => {
  return InvokeApi('POST', url, data);
};
export const Put = (url, data) => {
  return InvokeApi('PUT', url, data);
};
export const Delete = (url) => {
  return InvokeApi('DELETE', url);
};

// 下载
export const downloadFile = (
  url,
  method = 'GET',
  { fileType = 'application/octet-stream', fileName = '', data = {} } = {},
) => {
  InvokeApi(method, url, {}, 'blob').then((res) => {
    const content = res.data; //返回的内容
    if (!fileName) {
      let fileNameStr = res.response.headers
        .get('content-disposition')
        .split(';')[1];
      fileName = decodeURI(fileNameStr.split('=')[1]); // 形如filename=123.zip
    }
    const blob = new Blob([content], { type: fileType });
    download(blob, fileName);
  });
};
