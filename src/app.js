import { OA_PLATFORM_API, prefix } from 'config'
export const request = {
  timeout: 10000,
  middlewares: [
    async function middlewareA (ctx, next) {
      await next();
    },
  ],
  requestInterceptors: [
    (url, options) => {
      let urlFilter = `${OA_PLATFORM_API}/user/user_login`
      if (!urlFilter.includes(url)) {
        let token = window.sessionStorage.getItem(`${prefix}token`)
        options.headers['token'] = token;
      }
    }
  ],
  responseInterceptors: [
    (response) => {
      return response;
    }
  ]
}