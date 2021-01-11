import { Get } from 'utils/requestService';
// 获取授权列表
export const GetAuthorizeList = (userId) => {
  return Get('/user/get_authorize_list?userId=' + userId);
};
// 获取当前用户
export const GetUser = (userId) => {
  return Get('/user/get?id=' + userId);
};
// 获取菜单列表
export const GetMenuList = () => {
  return Get('/menu/get_list');
};
