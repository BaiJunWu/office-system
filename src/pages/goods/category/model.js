import { message } from 'antd';
import {
  ProductCategoryGetList,
  ProductCategoryRemove,
  ProductCategoryAdd,
  ProductCategoryEdit,
} from './services';
import { arrayToTree } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'category',

  state: {
    categoryList: [],
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods/category') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(ProductCategoryGetList);
      let categoryList = arrayToTree(
        data[VALUE],
        'productCategoryId',
        'fatherProductCategoryId',
      );
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleGetList',
          payload: {
            categoryList,
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const data = yield call(ProductCategoryAdd, { ...payload });
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
      const data = yield call(ProductCategoryEdit, { ...payload });
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
      const data = yield call(ProductCategoryRemove, id);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'query' });
      }
    },
  },

  reducers: {
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
    handleGetList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
