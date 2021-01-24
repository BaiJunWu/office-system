import { message } from 'antd';
import { BannerGetList, BannerRemove, BannerAdd, BannerEdit } from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'banner',

  state: {
    bannerList: [],
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/base/banner') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(BannerGetList);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            bannerList: data[VALUE],
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const data = yield call(BannerAdd, { ...payload });
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
      const data = yield call(BannerEdit, { ...payload });
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
      const { id } = payload;
      const data = yield call(BannerRemove, id);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'query' });
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
