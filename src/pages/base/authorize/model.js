import { message } from 'antd';
import {
  AuthorizeRemove,
  AuthorizeEdit,
  AuthorizeAdd,
  AuthorizeSearch,
} from './services';
import { resResult } from 'utils/config';
import { arrayToTree, compare } from 'utils/common';
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
      const data = yield call(AuthorizeAdd, { ...payload });
      if (data[STATUS] === SUCCESS) {
        message.success('添加成功');
        yield put({ type: 'authorize/search' });
      }
    },
    *edit({ payload }, { call, put }) {
      const data = yield call(AuthorizeEdit, { ...payload });
      if (data[STATUS] === SUCCESS) {
        message.success('修改成功');
        yield put({ type: 'authorize/search' });
      }
    },
    *search({ payload }, { call, put }) {
      const data = yield call(AuthorizeSearch, payload);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            appidList: data[VALUE],
          },
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const { id } = payload;
      const data = yield call(AuthorizeRemove, id);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'authorize/search' });
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
