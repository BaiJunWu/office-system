import _request from './request';
import { WECHAT_PLATFORM_API } from 'config';

export const InvokeApi = async (method, aUrl, data) => {
  // 添加基地址
  let url = WECHAT_PLATFORM_API + aUrl;
  return _request({ method, url, data });
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
