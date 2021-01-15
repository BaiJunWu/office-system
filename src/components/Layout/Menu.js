import React, { Fragment, useState } from 'react';
import { NavLink, useLocation } from 'umi';
import { Menu } from 'antd';
import { arrayToTree, compare } from 'utils/common';
const { SubMenu } = Menu;

const ComMenu = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();

  const menuList = props.menuList;

  const menuTree = arrayToTree(menuList, 'menuId', 'menuParentId').sort(
    compare('menuOrder'),
  );
  let menuKey = menuList.filter((_) => _.menuUrl == location.pathname);

  const onOpenChange = (Keys) => {
    const rootSubmenuKeys = menuList
      .filter((_) => !_.menuParentId)
      .map((_) => _.menuId);
    const latestOpenKey = Keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(Keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const generateMenus = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.menuId}
            title={
              <Fragment>
                <span>{item.menuName}</span>
              </Fragment>
            }
          >
            {generateMenus(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.menuId}>
          <NavLink to={item.menuUrl}>
            <span>{item.menuName}</span>
          </NavLink>
        </Menu.Item>
      );
    });
  };

  const handleselect = (key) => {};
  return (
    <Menu
      mode="inline"
      theme={props.theme}
      selectedKeys={menuKey.length == 0 ? [] : [menuKey[0].menuId]}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      onSelect={handleselect}
    >
      {generateMenus(menuTree)}
    </Menu>
  );
};
export default ComMenu;
