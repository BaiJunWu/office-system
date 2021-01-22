import { Get, Post, Put, Delete } from 'utils/requestService';

export function MenuList() {
  return Get('/menu/get_list');
}

export function MenuAdd(params) {
  return Post('/menu/add', params);
}

export function MenuEdit(params) {
  return Put('/menu/edit', params);
}

export function MenuRemove(id) {
  return Delete('/menu/remove?id=' + id);
}
