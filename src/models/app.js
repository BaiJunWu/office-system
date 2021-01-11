import { history } from 'umi';
import { prefix, resResult } from 'utils/config';
import { GetAuthorizeList, GetUser, GetMenuList } from '../services';
const { SUCCESS, STATUS, VALUE } = resResult;
export default {
  namespace: 'app',

  state: {
    collapsed: false,
    theme: 'light',
    appId: sessionStorage.getItem(`${prefix}appId`)
      ? sessionStorage.getItem(`${prefix}appId`)
      : '',
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          let token = window.sessionStorage.getItem(`${prefix}token`);
          if (token) {
            dispatch({
              type: 'authorizeList',
              payload: {},
            });
          } else {
            history.push('/login');
          }
        }
      });
    },
    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window;
        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE);
            cancelRequest.delete(key);
          }
        });
      });
    },
  },

  effects: {
    // 获取授权列表
    *authorizeList({ payload }, { select, put, call }) {
      let userId = window.sessionStorage.getItem(`${prefix}userId`);
      let data = yield call(GetAuthorizeList, userId);
      if (data[STATUS] === SUCCESS) {
        sessionStorage.setItem(`${prefix}appList`, JSON.stringify(data[VALUE]));
        sessionStorage.setItem(`${prefix}appId`, data[VALUE][0].appId);
        yield put({
          type: 'user',
        });
        yield put({
          type: 'menulist',
        });
      } else {
        history.push('/login');
      }
    },
    // 获取当前用户信息
    *user({ payload }, { put, call }) {
      let userId = window.sessionStorage.getItem(`${prefix}userId`);
      let data = yield call(GetUser, userId);
      if (data[STATUS] === SUCCESS) {
        sessionStorage.setItem(`${prefix}user`, data[VALUE].userName);
      } else {
        history.push('/login');
      }
    },
    *menulist({ payload }, { put, call }) {
      let data = yield call(GetMenuList);
      if (data[STATUS] === SUCCESS) {
        sessionStorage.setItem(
          `${prefix}menuList`,
          JSON.stringify(data[VALUE]),
        );
      }
    },
    // 退出登陆
    *signOut({ payload }, { call, put }) {
      window.sessionStorage.clear();
      history.push('/');
    },
  },

  reducers: {
    handleEditCollapsed(state, { payload }) {
      return { ...state, ...payload };
    },
    handleEditTheme(state, { payload }) {
      return { ...state, ...payload };
    },
    handleAppId_Change(state, { payload }) {
      sessionStorage.setItem(`${prefix}appId`, payload.appId);
      return { ...state, ...payload };
    },
  },
};
