import React, { Fragment, useState } from 'react'
import { NavLink } from 'umi';
import { Menu, Icon } from 'antd'
import { prefix } from 'utils/config'
import { arrayToTree, compare } from 'utils/common'
const { SubMenu } = Menu

const ComMenu = (props) => {
  const [openKeys, setOpenKeys] = useState([]);

  const menuList = JSON.parse(sessionStorage.getItem(`${prefix}menulist`))

  const menuTree = arrayToTree(menuList, 'menuId', 'parentMenuId').sort(compare('menuOrder'))

  const onOpenChange = Keys => {
    const rootSubmenuKeys = menuList.filter(_ => !_.parentMenuId).map(_ => _.menuId)
    const latestOpenKey = Keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(Keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

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

  const handleselect = key => {

  }
  return (
    <Menu mode="inline" theme='light' onOpenChange={onOpenChange} openKeys={openKeys} onSelect={handleselect}  >
      {generateMenus(menuTree)}
    </Menu>
  )
}
export default ComMenu