import { WECHAT_PLATFORM_API, prefix, resResult } from 'config';
import { message } from 'antd';
const { SUCCESS, STATUS } = resResult;
export const request = {
  timeout: 10000,
  // 请求中间件
  middlewares: [
    async function middlewareA(ctx, next) {
      await next();
      const { res } = ctx;
      if (res[STATUS] !== SUCCESS) {
        message.error(res.response);
      }
    },
  ],
  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      let urlFilter = `${WECHAT_PLATFORM_API}/user/user_login`;
      if (!urlFilter.includes(url)) {
        let token = window.sessionStorage.getItem(`${prefix}token`);
        options.headers['token'] = token;
      }
    },
  ],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
