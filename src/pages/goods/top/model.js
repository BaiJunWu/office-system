import { message } from 'antd';
import {
  queryGoodsTop,
  ProductSearch,
  ProductCategoryGetList,
  ProductSearchRecommended,
} from './services';
import { arrayToTree } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'top',

  state: {
    productName: '',
    categoryCode: '',
    pageIndex: 1,
    pageSize: 10,
    categoryList: [], // 类别列表
    selectProductList: [], // 选择商品列表
    productList: [], // 商品列表
    modelproductList: [], // 商品列表
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods/top') {
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
            categoryList,
          },
        });
      }
    },
    *search({ payload }, { call, put }) {
      const { pageIndex, pageSize } = payload;
      const data = yield call(queryGoodsTop, payload);
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
    *modelsearch({ payload }, { call, put }) {
      const { pageIndex, pageSize } = payload;
      const data = yield call(ProductSearch, payload);
      if (data[STATUS] === SUCCESS) {
        data[VALUE].pageIndex = pageIndex;
        data[VALUE].pageSize = pageSize;
        yield put({
          type: 'handleList',
          payload: {
            ...payload,
            modelproductList: data[VALUE],
          },
        });
      }
    },
    *recommendedGoods({ payload }, { call, put }) {
      const { recommendedProduct } = payload;
      const data = yield call(ProductSearchRecommended, payload);
      if (data[STATUS] === SUCCESS) {
        if (recommendedProduct == 0) {
          message.success('删除成功');
        } else {
          message.success('添加成功');
        }
        yield put({
          type: `handleModalVisible`,
          payload: {
            modalVisible: false,
            record: null,
            selectProductList: [],
            pageIndex: 1,
            pageSize: 10,
          },
        });
        yield put({
          type: 'search',
          payload: {
            ...payload,
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
  },
};
