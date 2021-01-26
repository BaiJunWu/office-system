import { Get, Put, Delete } from 'utils/requestService';

export function queryMerchant() {
  return Get('/vendor/get_list');
}

export function OrderDelivery(params) {
  return Put('/order/delivery', params);
}

export function OrderExportExcel(params) {
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

export function OrderCancel(params) {
  let { orderId, appIdMp } = params;
  return Delete(`/order/cancel?id=${orderId}&appIdMp=${appIdMp}`);
}
