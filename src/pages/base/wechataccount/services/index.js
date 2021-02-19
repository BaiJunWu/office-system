import { Get, Put, Delete, Post } from 'utils/requestService';

export function WechatGetList(params) {
  return Get(`/wechat/get_list?appId=${params}`);
}

export function WechatRemove(params) {
  return Delete(`/wechat/remove?id=${params}`);
}

export function WechatAdd(params) {
  return Post('/wechat/add', params);
}

export function WechatEdit(params) {
  return Put('/wechat/edit', params);
}

export function WechatGetErpList(params) {
  return Get(`/brand/get_erp_list?appId=${params}`);
}
