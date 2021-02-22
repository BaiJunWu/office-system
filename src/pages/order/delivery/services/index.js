import { Get, Put, Delete, downloadFile } from 'utils/requestService';

export function queryMerchant() {
  return Get('/vendor/get_list');
}

export function get(params) {
  return Get(`/order/get?id=${params}`);
}

export function delivery(params) {
  return Put('/order/delivery', params);
}

export function exportFile(params) {
  let url = '/order/export_excel';
  return params
    ? downloadFile(`${url}?${params}`, 'get')
    : downloadFile(`${url}`, 'get');
}

export function OrderSearch(params) {
  const {
    beginDate,
    endDate,
    customerName,
    vendorId,
    orderState,
    invoiceState,
    customerPhone,
    pageIndex,
    pageSize,
  } = params;
  return Get(
    '/order/search?beginDate=' +
      beginDate +
      '&endDate=' +
      endDate +
      '&customerName=' +
      customerName +
      '&vendorId=' +
      vendorId +
      '&orderState=' +
      orderState +
      '&invoiceState=' +
      invoiceState +
      '&customerPhone=' +
      customerPhone +
      '&pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize,
  );
}
