import { resolve } from 'path'
import { defineConfig } from 'umi';
import { OA_PLATFORM_API, OA_PLATFORM_SERVER } from './src/utils/config'


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
    [OA_PLATFORM_API]: {
      target: OA_PLATFORM_SERVER,
      changeOrigin: true
    },
  },
  routes: [
    { path: "/login", component: "./login" },
    {
      path: "/", component: "../layouts",
      routes: [
        { exact: true, path: "/oapending", component: "./oapending" },
        { exact: true, path: "/oamanage", component: "./oamanage" },
      ]
    },
  ]
});
