import { GetAppliedPage } from './services'
import { prefix, resResult, paginationInfo } from 'utils/config'
import { pagination } from 'utils/common'
const { SUCCESS, STATUS, VALUE, MSG, } = resResult

export default {
  namespace: 'oapending',

  state: {
    list: [],
    selectedRowKeys: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname == '/dashboard') {
          dispatch({
            type: 'query',
            payload: {
              ...paginationInfo,
              selectedRowKeys: []
            }
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const { page, pageSize, selectedRowKeys } = payload;
      const userId = window.sessionStorage.getItem(`${prefix}userId`)
      const query = {
        userId,
        queryPageDto: { pageIndex: page, pageSize: pageSize }
      }
      const data = yield call(GetAppliedPage, query)
      if (data[STATUS] === SUCCESS) {
        let list = data[VALUE];
        pagination(list, (page, pageSize) => {
          console.log(page);
          console.log(pageSize);
        })
        yield put({
          type: 'handleApplied',
          payload: {
            list,
            selectedRowKeys,
          }
        })
      }
    }
  },

  reducers: {
    handleApplied (state, { payload }) {
      return { ...state, ...payload }
    }
  },
};
