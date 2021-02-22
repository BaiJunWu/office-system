import { Get, Post, Put, Delete } from 'utils/requestService';

export function ProductCategoryGetList() {
  return Get('/product_category/get_list');
}

export function queryGoodsTop(params) {
  const { pageIndex, pageSize } = params;
  return Get(
    '/product/get_recommended_product_list?pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize,
  );
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

export function ProductSearchRecommended(params) {
  const { recommendedProduct } = params;
  return Post(
    '/product/update_recommended_product_list?recommendedProduct=' +
      recommendedProduct,
    params,
  );
}
