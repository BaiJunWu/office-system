import { message } from 'antd';
import {
  WechatGetList,
  WechatRemove,
  WechatAdd,
  WechatEdit,
  WechatSearch,
  WechatGetErpList,
} from './services';
import { pathMatchRegexp } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'wechataccount',

  state: {
    wechatList: null,
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathMatchRegexp(
          '/base/wechataccount/:id',
          location.pathname,
        );
        match &&
          dispatch({
            type: 'query',
            payload: {
              appId: match[1],
            },
          });
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { appId } = payload;
      const data = yield call(WechatGetList, appId);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            wechatList: data[VALUE],
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const data = yield call(WechatAdd, payload);
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
    *edit({ payload }, { call, put }) {},
    *remove({ payload }, { call, put }) {},
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
