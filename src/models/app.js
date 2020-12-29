import { GetWebMenuList } from "../services"
import { history } from 'umi'
import { message } from 'antd'
import { compare } from 'utils/common'
import { prefix, resResult } from 'utils/config'
const { SUCCESS, STATUS, VALUE, MSG, } = resResult
export default {
  namespace: 'app',

  state: {
    collapsed: false,
    theme: 'light',
    MenuList: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let token = window.sessionStorage.getItem(`${prefix}token`)
        if (pathname === '/login' || (pathname === '/' && !token)) {
          history.push('/login')
        } else {
          if (pathname === '/') {
            dispatch({
              type: 'GetMenuList'
            })
          }
        }
      });
    }
  },

  effects: {
    *GetMenuList ({ payload }, { put, call }) {
      let data = yield call(GetWebMenuList);
      if (data[STATUS] === SUCCESS) {
        const MenuList = data[VALUE].sort(compare('menuOrder'));
        yield put({
          type: 'handleMenuList',
          payload: { MenuList },
        })
      } else {
        message.error(data.response)
        history.push('/login')
      }
    }
  },

  reducers: {
    handleEditCollapsed (state, { payload }) {
      return { ...state, ...payload }
    },
    handleMenuList (state, { payload }) {
      return { ...state, ...payload }
    }
  },
};
