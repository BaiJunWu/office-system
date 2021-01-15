import { history } from 'umi';
import { login } from './services';
import { prefix, resResult } from 'utils/config';
const { SUCCESS, STATUS, VALUE, MSG } = resResult;

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call }) {
      const data = yield call(login, { ...payload });
      if (data[STATUS] === SUCCESS) {
        let { userId, token } = data[VALUE];
        window.sessionStorage.setItem(`${prefix}userId`, userId);
        window.sessionStorage.setItem(`${prefix}token`, token);
        history.push('/');
        yield put({
          type: 'app/init',
        });
      }
    },
  },
};
