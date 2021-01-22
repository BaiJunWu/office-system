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
  return Get(
    '/authorize/search?authorizeName=' +
      authorizeName +
      '&pageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize,
  );
}
