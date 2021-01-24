import { Get, Put, Delete, Post } from 'utils/requestService';

export async function BannerGetList() {
  return Get('/banner/get_list');
}

export async function BannerRemove(bannerId) {
  return Delete('/banner/remove?id=' + bannerId);
}

export async function BannerAdd(params) {
  return Post(`/banner/add`, params);
}

export async function BannerEdit(params) {
  return Put(`/banner/edit`, params);
}
