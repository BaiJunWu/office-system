import { message } from 'antd';
import { history } from 'umi';
import {
  AuthorizeRemove,
  AuthorizeEdit,
  AuthorizeAdd,
  AuthorizeSearch,
} from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'authorize',

  state: {
    authorizeName: '',
    pageIndex: 1,
    pageSize: 10,
    appidList: [],
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/base/authorize') {
          dispatch({
            type: 'search',
            payload: {
              authorizeName: '',
              pageIndex: 1,
              pageSize: 10,
            },
          });
        }
      });
    },
  },
  effects: {
    *add({ payload }, { call, put }) {
      const { values, ...search } = payload;
      const data = yield call(AuthorizeAdd, { ...values });
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleModalVisible',
          payload: {
            modalVisible: false,
            record: null,
          },
        });
        yield put({
          type: 'search',
          payload: {
            ...search,
          },
        });
        message.success('添加成功');
      }
    },
    *edit({ payload }, { call, put }) {
      const { values, ...search } = payload;
      const data = yield call(AuthorizeEdit, { ...values });
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleModalVisible',
          payload: {
            modalVisible: false,
            record: null,
          },
        });
        yield put({
          type: 'search',
          payload: {
            ...search,
          },
        });
        message.success('修改成功');
      }
    },
    *search({ payload }, { call, put }) {
      const { authorizeName, pageIndex, pageSize } = payload;
      const data = yield call(AuthorizeSearch, payload);
      if (data[STATUS] === SUCCESS) {
        data[VALUE].pageIndex = pageIndex;
        data[VALUE].pageSize = pageSize;
        yield put({
          type: 'handleList',
          payload: {
            appidList: data[VALUE],
            authorizeName,
          },
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const { id, ...search } = payload;
      const data = yield call(AuthorizeRemove, id);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleModalVisible',
          payload: {
            modalVisible: false,
            record: null,
          },
        });
        yield put({
          type: 'search',
          payload: {
            ...search,
          },
        });
        message.success('删除成功');
      }
    },
    *historypath({ payload }, { call, put }) {
      const { path, record } = payload;
      history.push(path + record.appId);
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
