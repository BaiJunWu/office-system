import { Get, Post, Put, Delete } from 'utils/requestService';

// 获取用户列表
export async function UserGetList(params) {
  return Get('/user/get_list');
}

// 获取用户权限
export async function GetUserPermission(userId) {
  return Get('/permission/get_user_permission?userId=' + userId);
}

// 保存用户权限
export async function PermissionSave(params) {
  const { userId, menuPermission } = params;
  return Post('/permission/save?userId=' + userId, menuPermission);
}

// 获取商户列表
export function VendorGetList() {
  return Get('/vendor/get_list');
}

// 获取用户商户关联表
export function GetUserVendor(userId) {
  return Get('/user_vendor/get_user_vendor?userId=' + userId);
}

// 新增用户商户关联表
export function SaveUserMerchant(params) {
  const { userId, vendorPermission } = params;
  return Post(
    '/user_vendor/set_user_vendor?userId=' + userId,
    vendorPermission,
  );
}
