import { GetAppliedPage } from './services';
import { prefix, resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'menu',

  state: {
    modalVisible: false,
  },

  subscriptions: {},

  effects: {},

  reducers: {
    handleModalVisible(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
