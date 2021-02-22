import { message } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { WECHAT_PLATFORM_API, prefix, resResult } from 'config';
const { SUCCESS, STATUS } = resResult;

export const request = {
  timeout: 10000,
  // 请求中间件
  middlewares: [
    async function middlewareA(ctx, next) {
      // 请求前加上appid
      let appId = sessionStorage.getItem(`${prefix}appId`) || '';
      const { req } = ctx;
      if (req.url.indexOf('appId') > 0) {
      } else {
        if (req.url.indexOf('?') > 0) {
          req.url = req.url + '&appId=' + appId;
        } else {
          req.url = req.url + '?appId=' + appId;
        }
      }
      if (
        req.options.data instanceof Object &&
        (req.options.method == 'post' || req.options.method == 'put')
      ) {
        if (!req.options.data.appId) {
          req.options.data.appId = appId;
        }
      }
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
      NProgress.start();
      NProgress.set(0.4);
      let urlFilter = `${WECHAT_PLATFORM_API}/user/user_login`;
      if (!urlFilter.includes(url)) {
        let token = window.sessionStorage.getItem(`${prefix}token`);
        options.headers['token'] = token;
      }
    },
  ],
  responseInterceptors: [
    (response, options) => {
      NProgress.done(); // 设置加载进度条(结束..)
      NProgress.remove();
      return response;
    },
  ],
};
