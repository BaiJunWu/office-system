import { Get, Post, Put, Delete } from 'utils/requestService';

export function UserGetList() {
  return Get('/user/get_list');
}

export function UserRemove(userId) {
  return Delete('/user/remove?userId=' + userId);
}

// 修改密码
export function UserResetUserPassword(userId) {
  return Get(
    '/user/reset_user_password?userId=' + userId + '&userPassword=' + '123456',
  );
}

export function UserAdd(params) {
  return Post('/user/add', params);
}

export function UserEdit(params) {
  return Put('/user/edit', params);
}
