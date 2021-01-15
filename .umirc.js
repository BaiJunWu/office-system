import { resolve } from 'path';
import { defineConfig } from 'umi';
import {
  WECHAT_PLATFORM_API,
  WECHAT_PLATFORM_SERVER,
} from './src/utils/config';

export default defineConfig({
  antd: {},
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
  },
  routes: [
    { exact: true, path: '/login', component: './login' },
    {
      path: '/',
      component: '../layouts',
      routes: [
        { exact: true, path: '/menu', component: './menu' },
        { component: './404' },
      ],
    },
  ],
});
