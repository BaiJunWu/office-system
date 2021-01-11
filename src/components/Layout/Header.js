import React, { Fragment } from 'react';
import { prefix } from 'utils/config';
import { Layout, Menu, Avatar, Select } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import style from './Header.less';
const { SubMenu } = Menu;

const ComHeader = (props) => {
  const { collapsed, appId } = props.model.app;
  const { onCollapseChange, appList, dispatch } = props.model;
  const userName = sessionStorage.getItem(`${prefix}user`);
  const rightContent = [
    <Menu
      key="user"
      mode="horizontal"
      onClick={(value) => handleMenu_Click(value)}
    >
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: '#999', marginRight: 10 }}>
              <div>Hi,</div>
            </span>
            <span>{userName}</span>
            <Avatar style={{ marginLeft: 8 }} />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut">退出</Menu.Item>
      </SubMenu>
    </Menu>,
  ];
  const addValueAndLabel = (Option, array, value, label) => {
    if (array instanceof Array) {
      return array.map((item) => {
        if (item[value] !== null) {
          return (
            <Option value={item[value]} key={item[value]}>
              {item[label]}
            </Option>
          );
        }
      });
    } else if (array instanceof Object) {
      return (
        <Option value={array[value]} key={array[value]}>
          {array[label]}
        </Option>
      );
    } else {
      return null;
    }
  };
  const handleSelect_Change = (value) => {
    dispatch({
      type: 'app/handleAppId_Change',
      payload: {
        appId: value,
      },
    });
  };
  const handleMenu_Click = (value) => {
    if (value.key === 'SignOut') {
      dispatch({ type: 'app/signOut' });
    }
  };
  return (
    <Layout.Header className={style.header}>
      <div className={style.button}>
        <div className={style.btn} onClick={() => onCollapseChange(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className={style.appIdSelect}>
        <Select
          style={{ width: 130 }}
          value={appId}
          onSelect={(value) => handleSelect_Change(value)}
        >
          {addValueAndLabel(Select.Option, appList, 'appId', 'authorizeName')}
        </Select>
      </div>
      <div className={style.rightContainer}>{rightContent}</div>
    </Layout.Header>
  );
};
export default ComHeader;
