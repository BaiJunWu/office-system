import React from 'react'
import { Layout } from 'antd'
import ComMenu from './Menu'
import config from 'config'
import style from '../index.less'

const ComSider = (props) => {
  const { isMobile, onCollapseChange } = props.model
  const { collapsed, theme, MenuList } = props.model.app
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
          {!collapsed && <h1>管理平台</h1>}
        </div>
      </div>
      <div className={style.menuContainer}>
        <ComMenu collapsed={collapsed} MenuList={MenuList} />
      </div>
    </Layout.Sider>
  )
}
export default ComSider