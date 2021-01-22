import { message } from 'antd';
import {
  VendorGetList,
  ProductSearch,
  ProductCategoryGetList,
  ProductAdd,
  ProductEdit,
  ProductRemove,
} from './services';
import { arrayToTree } from 'utils/common';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'goodinfo',

  state: {
    productName: '',
    categoryCode: '',
    pageIndex: 1,
    pageSize: 10,
    categoryList: [], // 类别列表
    productList: [], // 商品列表
    vendorList: [], // 商户列表
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
        if (location.pathname === '/goods/info') {
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
          type: 'getVendorList',
          payload: {
            ...payload,
            productList: data[VALUE],
          },
        });
      }
    },
    *getVendorList({ payload }, { call, put }) {
      const data = yield call(VendorGetList);
      if (data[STATUS] === SUCCESS) {
        yield put({
          type: 'handleList',
          payload: {
            vendorList: data[VALUE],
            ...payload,
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const { search, ...add } = payload;
      const data = yield call(ProductAdd, { ...add });
      yield put({
        type: 'handleModalVisible',
        payload: {
          modalVisible: false,
          record: null,
        },
      });
      if (data[STATUS] === SUCCESS) {
        message.success('添加成功');
        yield put({ type: 'search', payload: { ...search } });
      }
    },
    *edit({ payload }, { call, put }) {
      const { search, ...edit } = payload;
      const data = yield call(ProductEdit, { ...edit });
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
          type: 'search',
          payload: { ...search },
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const { productId, ...search } = payload;
      const data = yield call(ProductRemove, productId);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'search', payload: { ...search } });
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
    handlePage(state, { payload }) {
      return { ...state, ...payload };
    },
    handleImageList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
