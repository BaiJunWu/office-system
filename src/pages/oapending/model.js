import { GetAppliedPage } from './services';
import { prefix, resResult, paginationInfo } from 'utils/config';
import { pagination } from 'utils/common';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'oapending',

  state: {
    list: [],
    selectedRowKeys: [],
  },

  subscriptions: {},

  effects: {},

  reducers: {
    handleApplied(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
