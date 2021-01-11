import React from 'react';
import { Layout, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import ComMenu from './Menu';
import config from 'config';
import style from './Sider.less';

const ComSider = (props) => {
  const { isMobile, onCollapseChange, menuList, dispatch } = props.model;
  const { collapsed, theme } = props.model.app;
  const onThemeChange = () => {
    dispatch({
      type: 'app/handleEditTheme',
      payload: {
        theme: theme === 'dark' ? 'light' : 'dark',
      },
    });
  };
  return (
    <Layout.Sider
      breakpoint="lg"
      theme={theme}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint={!isMobile && onCollapseChange}
      className={style.sider}
    >
      <div className={style.brand}>
        <div className={style.logo}>
          <img alt="logo" src={config.logoPath} />
          {!collapsed && <h1>{config.siteName}</h1>}
        </div>
      </div>
      <div className={style.menuContainer}>
        <ComMenu collapsed={collapsed} theme={theme} menuList={menuList} />
      </div>
      {!collapsed && (
        <div className={style.switchTheme}>
          <span className={style.switchTheme_left}>
            <BulbOutlined />
            <div>Switch Theme</div>
          </span>
          <Switch
            onChange={() => onThemeChange()}
            defaultChecked={theme === 'dark'}
            checkedChildren={`Dark`}
            unCheckedChildren={`Light`}
          />
        </div>
      )}
    </Layout.Sider>
  );
};
export default ComSider;
