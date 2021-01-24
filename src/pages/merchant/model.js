import { message } from 'antd';
import { VendorSearch, VendorRemove, VendorAdd, VerdorEdit } from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'merchant',

  state: {
    vendorName: '',
    state: '',
    pageIndex: 1,
    pageSize: 10,
    vendorList: [],
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/merchant') {
          dispatch({
            type: 'query',
            payload: {
              vendorName: '',
              state: '',
              pageIndex: 1,
              pageSize: 10,
            },
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { pageIndex, pageSize } = payload;
      const data = yield call(VendorSearch, payload);
      if (data[STATUS] === SUCCESS) {
        data[VALUE].pageIndex = pageIndex;
        data[VALUE].pageSize = pageSize;
        yield put({
          type: 'handleList',
          payload: {
            vendorList: data[VALUE],
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const { values, ...search } = payload;
      const data = yield call(VendorAdd, { ...values });
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('添加成功');
        yield put({
          type: 'query',
          payload: search,
        });
      }
    },
    *edit({ payload }, { call, put }) {
      const { values, ...search } = payload;
      const data = yield call(VerdorEdit, { ...values });
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('修改成功');
        yield put({ type: 'query', payload: search });
      }
    },
    *remove({ payload }, { call, put }) {
      const { id, ...search } = payload;
      const data = yield call(VendorRemove, id);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'query', payload: search });
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
