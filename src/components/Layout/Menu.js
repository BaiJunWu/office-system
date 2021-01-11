import React, { Fragment, useState } from 'react';
import { NavLink } from 'umi';
import { Menu } from 'antd';
import { arrayToTree, compare } from 'utils/common';
import { MenuUnfoldOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const ComMenu = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const menuList = props.menuList;
  const menuTree = arrayToTree(menuList, 'menuId', 'menuParentId').sort(
    compare('menuOrder'),
  );
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
                <MenuUnfoldOutlined />
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
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      onSelect={handleselect}
    >
      {generateMenus(menuTree)}
    </Menu>
  );
};
export default ComMenu;
