import { history } from 'umi';
import { prefix, resResult } from 'utils/config';
import { GetAuthorizeList, GetUser, GetMenuList } from '../services';
const { SUCCESS, STATUS, VALUE } = resResult;
export default {
  namespace: 'app',

  state: {
    collapsed: false,
    theme: 'light',
    appId: '',
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'init',
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
    *init({ payload }, { put, call }) {
      let userId = window.sessionStorage.getItem(`${prefix}userId`);
      // 获取授权列表
      let data = yield call(GetAuthorizeList, userId);
      if (data[STATUS] === SUCCESS) {
        sessionStorage.setItem(`${prefix}appList`, JSON.stringify(data[VALUE]));
        let isAppId = sessionStorage.getItem(`${prefix}appId`)
          ? sessionStorage.getItem(`${prefix}appId`)
          : data[VALUE][0].appId;
        let appId = payload ? payload.appId : isAppId;
        yield put({
          type: 'getMenuList',
          payload: {
            userId,
          },
        });
        yield put({
          type: 'handleAppId_Change',
          payload: {
            appId: appId,
          },
        });
      } else {
        history.push('/login');
      }
    },
    *getMenuList({ payload }, { call, put, all }) {
      let { userId } = payload;
      let data = yield all([call(GetUser, userId), call(GetMenuList)]);
      if (data[0][STATUS] === SUCCESS) {
        sessionStorage.setItem(`${prefix}user`, data[0][VALUE].userName);
      }
      if (data[1][STATUS] === SUCCESS) {
        sessionStorage.setItem(
          `${prefix}menuList`,
          JSON.stringify(data[1][VALUE]),
        );
      }
    },
    // 退出登陆
    *signOut({ payload }, { call, put }) {
      window.sessionStorage.clear();
      history.push('/login');
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
