import { message } from 'antd';
import { OrderSearch, OrderExportExcel, OrderCancel } from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'controller',

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
        if (location.pathname === '/order/home') {
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
    *exportFile({ payload }, { call, put }) {
      yield call(OrderExportExcel, payload);
    },
    *cancelOrder({ payload }, { call, put }) {
      const { search } = payload;
      const data = yield call(OrderCancel, payload);
      if (data[STATUS] === SUCCESS) {
        message.info(data[MSG]);
        yield put({
          type: 'query',
          payload: {
            ...search,
          },
        });
      } else {
        message.error(data[MSG]);
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
