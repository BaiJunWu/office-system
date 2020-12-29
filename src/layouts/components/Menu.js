import React, { Fragment } from 'react'
import { NavLink } from 'umi';
import { Menu, Icon } from 'antd'
import { arrayToTree, compare } from 'utils/common'
const { SubMenu } = Menu

const ComMenu = (props) => {
  const menuTree = arrayToTree(props.MenuList, 'menuId', 'parentMenuId').sort(compare('menuOrder'))
  const generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.menuId} title={
            <Fragment>
              <Icon type='menu-unfold' />
              <span>{item.menuName}</span>
            </Fragment>
          }
          >
            {generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.menuId}>
          <NavLink to={item.menuUrl}>
            <span>{item.menuName}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }
  return (
    <Menu mode="inline" theme='light' >
      {generateMenus(menuTree)}
    </Menu>
  )
}
export default ComMenu