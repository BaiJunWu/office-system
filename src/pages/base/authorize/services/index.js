import { Get, Put, Delete, Post } from 'utils/requestService';

export function AuthorizeRemove(id) {
  return Delete('/authorize/remove?id=' + id);
}

export function AuthorizeAdd(params) {
  return Post('/authorize/add', params);
}

export function AuthorizeEdit(params) {
  return Put('/authorize/edit', params);
}

export function AuthorizeSearch(params) {
  const { authorizeName, pageIndex, pageSize } = params;
  let aUrl = '';
  if (authorizeName == '' || !authorizeName) {
    aUrl = '?pageIndex=' + pageIndex;
  } else {
    aUrl = '?authorizeName=' + authorizeName + '&pageIndex=' + pageIndex;
  }
  return Get('/authorize/search' + aUrl + '&pageSize=' + pageSize);
}
