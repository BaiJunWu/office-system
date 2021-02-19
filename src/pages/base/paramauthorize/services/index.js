import { Get, Post } from 'utils/requestService';

export function query(params) {
  return Get(`/config/get?appId=${params}`);
}

export function save(params) {
  return Post('/config/add', params);
}
