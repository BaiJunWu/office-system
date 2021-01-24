import { resolve } from 'path';
import { defineConfig } from 'umi';
import {
  WECHAT_PLATFORM_API,
  WECHAT_PLATFORM_SERVER,
  WECHAT_PLATFORM_UPLOAD,
  WECHAT_PLATFORM_DOWNLOAD,
} from './src/utils/config';

export default defineConfig({
  dva: {
    immer: true,
    hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
    pages: resolve(__dirname, './src/pages'),
    config: resolve(__dirname, './src/utils/config'),
    components: resolve(__dirname, './src/components'),
  },
  proxy: {
    [WECHAT_PLATFORM_API]: {
      target: WECHAT_PLATFORM_SERVER,
      changeOrigin: true,
    },
    [WECHAT_PLATFORM_UPLOAD]: {
      target: 'http://wsptest.yibeitech.cn:18004',
      changeOrigin: true,
    },
    [WECHAT_PLATFORM_DOWNLOAD]: {
      target: 'http://wsptest.yibeitech.cn:18004',
      changeOrigin: true,
    },
  },
  routes: [
    { exact: true, path: '/login', component: './login' },
    {
      path: '/',
      component: '../layouts',
      routes: [
        { path: '/menu', component: './menu' },
        { path: '/user', component: './user' },
        { path: '/permission', component: './permission' },
        { path: '/goods/category', component: './goods/category' },
        { path: '/goods/info', component: './goods/info' },
        { path: '/goods/check', component: './goods/check' },
        { path: '/base/authorize', component: './base/authorize' },
        { path: '/base/banner', component: './base/banner' },
        { path: '/merchant', component: './merchant' },
        { component: './404' },
      ],
    },
  ],
});
