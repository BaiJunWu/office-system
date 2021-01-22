import { Get, Post, Put, Delete } from 'utils/requestService';

// 获取商户列表
export function VendorGetList() {
  return Get('/vendor/get_list');
}

export function ProductRemove(productId) {
  return Delete(`/product/remove?productId=${productId}`);
}

export function ProductAdd(params) {
  return Post('/product/add', params);
}

export function ProductEdit(params) {
  return Put('/product/edit', params);
}

export function ProductCategoryGetList() {
  return Get('/product_category/get_list');
}

export function ProductSearch(params) {
  const { pageIndex, pageSize, productName, categoryCode } = params;
  return Get(
    '/product/search?pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize +
      '&productName=' +
      productName +
      '&categoryCode=' +
      categoryCode,
  );
}
