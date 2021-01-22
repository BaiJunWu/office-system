import { Get, Post, Put, Delete } from 'utils/requestService';

// 获取商户列表
export function VendorGetList() {
  return Get('/vendor/get_list');
}

export function ProductCategoryGetList() {
  return Get('/product_category/get_list');
}

export function ProductSearch(params) {
  const { pageIndex, pageSize, productName, categoryCode, auditState } = params;
  return Get(
    '/product/search?pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize +
      '&productName=' +
      productName +
      '&categoryCode=' +
      categoryCode +
      '&auditState=' +
      auditState,
  );
}

export function ProductChangeAuditState(params) {
  const { productId, auditState } = params;
  return Get(
    '/product/change_audit_state?productId=' +
      productId +
      '&auditState=' +
      auditState,
  );
}
