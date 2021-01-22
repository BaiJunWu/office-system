import React, { Fragment } from 'react';
import { prefix } from 'utils/config';
import { Layout, Menu, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CSelect from 'components/CSelect';
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
  const handleSelect_Change = (value) => {
    dispatch({
      type: 'app/init',
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
  const selectProps = {
    style: { width: 130 },
    value: appId,
    onSelect: handleSelect_Change,
    data: appList,
    id: 'appId',
    name: 'authorizeName',
  };
  return (
    <Layout.Header className={style.header}>
      <div className={style.button}>
        <div className={style.btn} onClick={() => onCollapseChange(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className={style.appIdSelect}>
        <CSelect {...selectProps} />
      </div>
      <div className={style.rightContainer}>{rightContent}</div>
    </Layout.Header>
  );
};
export default ComHeader;
