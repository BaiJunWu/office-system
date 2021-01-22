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
export const GetUserPermission = (userId) => {
  return Get('/permission/get_user_permission?userId=' + userId);
};

export const get_list = (userId) => {
  return Get('/menu/get_list');
};
