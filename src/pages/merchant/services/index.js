import { Get, Post, Put, Delete } from 'utils/requestService';

export function VendorSearch(params) {
  const { vendorName, state, pageIndex, pageSize } = params;
  return Get(
    '/vendor/search?vendorName=' +
      vendorName +
      '&state=' +
      state +
      '&pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize,
  );
}

export function VendorRemove(verdorId) {
  return Delete('/vendor/remove?id=' + verdorId);
}

export function VendorAdd(params) {
  return Post('/vendor/add', params);
}

export function VerdorEdit(params) {
  return Put('/vendor/edit', params);
}
