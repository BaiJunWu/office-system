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
    theme: 'light'
  },

  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let token = window.sessionStorage.getItem(`${prefix}token`)
        if (pathname === '/login' || (pathname === '/' && !token)) {
          history.push('/login')
        }
      });
    }
  },

  effects: {
    *GetMenuList ({ payload }, { put, call }) {
      let data = yield call(GetWebMenuList);
      if (data[STATUS] === SUCCESS) {
        const MenuList = data[VALUE].sort(compare('menuOrder'));
        sessionStorage.setItem(`${prefix}menulist`, JSON.stringify(MenuList))
        history.push('/dashboard')
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
  },
};
