import { Get, Put, Delete, Post } from 'utils/requestService';

export function WechatGetList(params) {
  return Get(`/wechat/get_list?${params}`);
}

export function WechatRemove(params) {
  return Delete(`/wechat/remove?${params}`);
}

export function WechatAdd(params) {
  return Post('/wechat/add', params);
}

export function WechatEdit(params) {
  return Put('/wechat/edit', params);
}

export function WechatSearch(params) {
  let url = '/authorize/search';
  return params ? Get(`${url}?${params}`) : Get(`${url}`);
}

export function WechatGetErpList(params) {
  return Get(`/brand/get_erp_list?${params}`);
}
