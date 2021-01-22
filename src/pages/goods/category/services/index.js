import { Get, Post, Put, Delete } from 'utils/requestService';

export function ProductCategoryGetList() {
  return Get('/product_category/get_list');
}

export function ProductCategoryRemove(id) {
  return Delete(`/product_category/remove?id=${id}`);
}

export function ProductCategoryAdd(params) {
  return Post('/product_category/add', params);
}

export function ProductCategoryEdit(params) {
  return Put('/product_category/edit', params);
}
