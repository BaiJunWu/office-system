import { Get, Put, Delete, downloadFile } from 'utils/requestService';

export function OrderDelivery(params) {
  return Put('/order/delivery', params);
}

export function OrderExportExcel(params) {
  const {
    beginDate,
    endDate,
    customerName,
    vendorId,
    orderState,
    invoiceState,
    customerPhone,
  } = params;
  return downloadFile(
    '/order/export_excel?beginDate=' +
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
      customerPhone,
  );
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
  let { orderId, appIdMp, appId } = params;
  return Delete(
    `/order/cancel?id=${orderId}&appIdMp=${appIdMp}&appId=${appId}`,
  );
}
