import { Get, Put, Delete, downloadFile } from 'utils/requestService';

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

export function get(params) {
  return Get(`/order/get?id=${params}`);
}
export function OrderInvoice(params) {
  return Get(`/order/invoice?orderId=${params}`);
}

export function queryCondition(params) {
  let url = '/order/search';
  return params ? Get(`${url}?${params}`) : Get(`${url}`);
}
