import { message } from 'antd';
import { OrderSearch, queryMerchant } from './services';
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
    orderList: [],
    vendorList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order/controller') {
          dispatch({
            type: 'getvendorlist',
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { pageIndex, pageSize, orderDate, ...search } = payload;
      const data = yield call(OrderSearch, payload);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            orderList: data[VALUE],
            ...search,
          },
        });
      }
    },
    *getvendorlist({ payload }, { call, put }) {
      const data = yield call(queryMerchant);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            vendorList: data[VALUE],
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
