import { message } from 'antd';
import {} from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'top',

  state: {
    modalVisible: false,
    record: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods/top') {
        }
      });
    },
  },

  effects: {},

  reducers: {
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
    handleList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
