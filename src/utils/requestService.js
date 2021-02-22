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

export const downloadFile = (
  url,
  method = 'GET',
  { fileType = 'application/octet-stream', fileName = '', data = {} } = {},
) => {
  InvokeApi(method, url, {}, 'blob').then((response) => {
    const content = response.data; //返回的内容
    if (!fileName) {
      // let fileNameStr = response.response.headers.get('content-disposition').split(";")[1];
      // fileName = decodeURI(fileNameStr.split("=")[1]); // 形如filename=123.zip
    }
    const blob = new Blob([content], { type: fileType });
    console.log(fileName);
    console.log(blob);
    download(blob, fileName);
  });
};
