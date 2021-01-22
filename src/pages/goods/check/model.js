import { message } from 'antd';
import {
  ProductSearch,
  ProductCategoryGetList,
  ProductChangeAuditState,
} from './services';
import { arrayToTree } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'check',

  state: {
    productName: '',
    categoryCode: '',
    auditState: '',
    pageIndex: 1,
    pageSize: 10,
    categoryList: [], // 类别列表
    productList: [], // 商品列表
    imageList: [], // 商品图片
    detailList: [], // 商品详情
    itemList: [], // 规格型号
    priceList: [], // 商品价格
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods/check') {
          dispatch({
            type: 'query',
            payload: {
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
      const data = yield call(ProductCategoryGetList);
      if (data[STATUS] === SUCCESS) {
        let categoryList = arrayToTree(
          data[VALUE],
          'productCategoryId',
          'fatherProductCategoryId',
        );
        yield put({
          type: 'search',
          payload: {
            ...payload,
            productName: '',
            categoryCode: '',
            auditState: '',
            categoryList,
          },
        });
      }
    },
    *search({ payload }, { call, put }) {
      const { pageIndex, pageSize } = payload;
      const data = yield call(ProductSearch, payload);
      if (data[STATUS] === SUCCESS) {
        data[VALUE].pageIndex = pageIndex;
        data[VALUE].pageSize = pageSize;
        yield put({
          type: 'handleList',
          payload: {
            ...payload,
            productList: data[VALUE],
          },
        });
      }
    },
    *submit({ payload }, { call, put }) {
      const { productId, auditState1, ...search } = payload;
      const data = yield call(ProductChangeAuditState, {
        productId,
        auditState: auditState1,
      });
      if (data[STATUS] === SUCCESS) {
        message.success('审核成功');
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
      }
    },
  },

  reducers: {
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
    handleList(state, { payload }) {
      return { ...state, ...payload };
    },
    handleImageList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
