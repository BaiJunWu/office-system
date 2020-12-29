import { Post } from 'utils/requestService'

export function login (data) {
  return Post('/user/user_login', data)
}


