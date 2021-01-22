import { message } from 'antd';
import { MenuList, MenuAdd, MenuEdit, MenuRemove } from './services';
import { resResult } from 'utils/config';
import { arrayToTree, compare } from 'utils/common';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'menu',

  state: {
    menuList: [],
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/menu') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(MenuList);
      if (data[STATUS] === SUCCESS) {
        let menuList = arrayToTree(data[VALUE], 'menuId', 'menuParentId').sort(
          compare('menuOrder'),
        );
        yield put({
          type: 'handleMenuList',
          payload: {
            menuList,
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const data = yield call(MenuAdd, { ...payload });
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
      const data = yield call(MenuEdit, { ...payload });
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
      const data = yield call(MenuRemove, id);
      if (data[STATUS] === SUCCESS) {
        message.success('删除成功');
        yield put({ type: 'query' });
      }
    },
  },

  reducers: {
    handleMenuList(state, { payload }) {
      return { ...state, ...payload };
    },
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
