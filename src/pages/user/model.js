import { message } from 'antd';
import {
  UserGetList,
  UserAdd,
  UserEdit,
  UserRemove,
  UserResetUserPassword,
} from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'user',

  state: {
    userList: [],
    record: null,
    modalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(UserGetList);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleUserList',
          payload: {
            userList: data[VALUE],
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const data = yield call(UserAdd, { ...payload });
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('添加成功');
        yield put({ type: 'query' });
      }
    },
    *edit({ payload }, { call, put }) {
      const data = yield call(UserEdit, { ...payload });
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('修改成功');
        yield put({ type: 'query' });
      }
    },
    *remove({ payload }, { call, put }) {
      const { userId } = payload;
      const data = yield call(UserRemove, userId);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'query' });
      }
    },
    *resetUserPassword({ payload }, { call, put }) {
      const { userId } = payload;
      const data = yield call(UserResetUserPassword, userId);
      if (data[STATUS] === SUCCESS) {
        message.success('重置成功 密码为123456');
        yield put({ type: 'query' });
      }
    },
  },

  reducers: {
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
    handleUserList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
