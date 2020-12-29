import React, { Fragment } from 'react'
import { Layout, Icon, Menu, Avatar } from 'antd'
import style from '../index.less'
const { SubMenu } = Menu

const ComHeader = (props) => {
  const { collapsed } = props.model.app
  const { onCollapseChange } = props.model
  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: '#999', marginRight: 10 }}>
              <div>Hi,</div>
            </span>
            <span>{'woo'}</span>
            <Avatar style={{ marginLeft: 8 }} />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut">退出</Menu.Item>
      </SubMenu>
    </Menu>
  ]
  return (
    <Layout.Header className={style.header} id="layoutHeader">
      <div className={style.button} onClick={() => onCollapseChange(!collapsed)} >
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
      <div className={style.rightContainer}>{rightContent}</div>
    </Layout.Header>
  )
}
export default ComHeader