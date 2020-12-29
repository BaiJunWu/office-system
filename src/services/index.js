import { Get } from 'utils/requestService'
export const GetWebMenuList = () => {
  return Get('/web_menu/get_list')
}