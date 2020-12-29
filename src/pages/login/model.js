import { history } from 'umi';
import { login } from "./services"
import { prefix, resResult } from 'utils/config'
const { SUCCESS, STATUS, VALUE, MSG, } = resResult

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login ({ payload }, { put, call }) {
      let appId = 'jds4cfa9fb474324546a36b776b47e1c7dc';
      let secret = '3e4b4ed9ab13654a2303a5ea6d8242de8f78a05fc62c491cad4bb31185813910';
      const data = yield call(login, { ...payload, appId, secret });
      if (data[STATUS] === SUCCESS) {
        let { userId, token } = data[VALUE];
        window.sessionStorage.setItem(`${prefix}userId`, userId);
        window.sessionStorage.setItem(`${prefix}token`, token);
        yield put({ type: 'app/GetMenuList' })
      }
    }
  },
}
