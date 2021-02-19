import { message } from 'antd';
import {
  WechatGetList,
  WechatRemove,
  WechatAdd,
  WechatEdit,
  WechatGetErpList,
} from './services';
import { pathMatchRegexp } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'wechataccount',

  state: {
    brandList: [],
    wechatList: [],
    appId: '',
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
        if (match) {
          match &&
            dispatch({
              type: 'query',
              payload: {
                appId: match[1],
              },
            });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { appId } = payload;
      const data = yield call(WechatGetList, appId);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'brandList',
          payload: {
            wechatList: data[VALUE],
            appId,
          },
        });
      }
    },
    *brandList({ payload }, { call, put }) {
      const { appId, wechatList } = payload;
      const data = yield call(WechatGetErpList, appId);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            appId,
            wechatList,
            brandList: data[VALUE],
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const { appId } = payload;
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
        yield put({
          type: 'query',
          payload: {
            appId,
          },
        });
      }
    },
    *edit({ payload }, { call, put }) {
      const { appId } = payload;
      const data = yield call(WechatEdit, payload);
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('修改成功');
        yield put({
          type: 'query',
          payload: {
            appId,
          },
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const { id, appId } = payload;
      const data = yield call(WechatRemove, id);
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({
          type: 'query',
          payload: {
            appId,
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
