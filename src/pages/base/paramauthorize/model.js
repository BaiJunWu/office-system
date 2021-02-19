import { message } from 'antd';
import { query, save } from './services';
import { pathMatchRegexp } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'paramauthorize',

  state: {
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathMatchRegexp(
          '/base/paramauthorize/:id',
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
      const data = yield call(query, appId);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            record: data[VALUE],
          },
        });
      }
    },
    *save({ payload }, { call, put }) {
      const { appId } = payload;
      const data = yield call(save, payload);
      if (data[STATUS] === SUCCESS) {
        message.success('保存成功');
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
