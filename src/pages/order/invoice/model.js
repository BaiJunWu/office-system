import { message } from 'antd';
import { OrderSearch, OrderInvoice } from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'invoice',

  state: {
    beginDate: '',
    endDate: '',
    customerName: '',
    vendorId: '',
    orderState: '',
    invoiceState: '',
    customerPhone: '',
    pageIndex: 1,
    pageSize: 10,
    modalVisible: false,
    record: null,
    orderList: [],
    vendorList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order/invoice') {
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { pageIndex, pageSize, orderDate, ...search } = payload;
      const data = yield call(OrderSearch, payload);
      if (data[STATUS] === SUCCESS) {
        data[VALUE].pageIndex = pageIndex;
        data[VALUE].pageSize = pageSize;
        yield put({
          type: 'handleList',
          payload: {
            orderList: data[VALUE],
            ...search,
          },
        });
      }
    },
    *invoiceorder({ payload }, { call, put }) {
      let { orderId, ...search } = payload;
      const data = yield call(OrderInvoice, orderId);
      if (data[STATUS] === SUCCESS) {
        message.success(data[MSG]);
        yield put({
          type: `handleModalVisible`,
          payload: {
            modalVisible: false,
            record: null,
          },
        });
        yield put({
          type: 'query',
          payload: {
            ...search,
          },
        });
      }
    },
  },

  reducers: {
    handleList(state, { payload }) {
      return { ...state, ...payload };
    },
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
