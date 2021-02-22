import { message } from 'antd';
import { OrderSearch, queryMerchant, delivery } from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'delivery',

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
        if (location.pathname === '/order/delivery') {
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
    *orderdelivery({ payload }, { call, put }) {
      const { search, ...body } = payload;
      const data = yield call(delivery, body);
      if (data[STATUS] === SUCCESS) {
        message.info(data[MSG]);
        yield put({
          type: `delivery/handleModalVisible`,
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
