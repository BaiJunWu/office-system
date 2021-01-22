import { message } from 'antd';
import {
  UserGetList,
  VendorGetList,
  GetUserVendor,
  GetUserPermission,
  PermissionSave,
  SaveUserMerchant,
} from './services';
import { resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'permission',

  state: {
    userId: '',
    userList: [],
    vendorList: [],
    menuPermission: [],
    vendorPermission: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/permission') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { all, call, put }) {
      let isGet = true;
      const data = yield all([call(UserGetList), call(VendorGetList)]);
      for (let i = 0; i < data.length; i++) {
        if (data[i][STATUS] !== SUCCESS) {
          isGet = false;
        }
      }
      if (isGet) {
        yield put({
          type: 'handleQuery',
          payload: {
            userId: '',
            menuPermission: [],
            vendorPermission: [],
            userList: data[0][VALUE],
            vendorList: data[1][VALUE],
          },
        });
      }
    },
    // 查询权限
    *getPermission({ payload }, { all, call, put }) {
      let isGet = true;
      const { userId } = payload;
      const data = yield all([
        call(GetUserPermission, userId),
        call(GetUserVendor, userId),
      ]);
      for (let i = 0; i < data.length; i++) {
        if (data[i][STATUS] !== SUCCESS) {
          isGet = false;
        }
      }
      if (isGet) {
        let menuPermission = [];
        let vendorPermission = [];
        data[0][VALUE].forEach((item) => {
          menuPermission.push(item.menuId);
        });
        data[1][VALUE].forEach((item) => {
          vendorPermission.push(item.vendorId);
        });
        yield put({
          type: 'handlePermission',
          payload: {
            userId,
            menuPermission,
            vendorPermission,
          },
        });
      }
    },
    // 保存权限
    *savePermission({ payload }, { all, call, put }) {
      let isGet = true;
      const { userId } = payload;
      const data = yield all([
        call(PermissionSave, { ...payload }),
        call(SaveUserMerchant, { ...payload }),
      ]);
      for (let i = 0; i < data.length; i++) {
        if (data[i][STATUS] !== SUCCESS) {
          isGet = false;
        }
      }
      if (isGet) {
        message.success('保存成功');
      }
      yield put({
        type: 'getPermission',
        payload: {
          userId,
        },
      });
    },
  },

  reducers: {
    handleQuery(state, { payload }) {
      return { ...state, ...payload };
    },
    handlePermission(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
