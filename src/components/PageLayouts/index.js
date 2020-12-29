import React, { Component } from 'react'
import { Card, Layout } from 'antd'
const { Sider, Content } = Layout
import style from './index.less'

export class PageLayouts extends Component {
  state = {
    isCollapsed: false,
  }
  handleCollapsed_Click = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }
  render () {
    return (
      <div className={style.pending}>
        <Layout>
          <Layout>
            <Sider
              collapsed={this.state.isCollapsed}
              collapsible={true}
              collapsedWidth={0}
              onCollapse={this.handleCollapsed_Click}
            >
              <Card className={style.cardleft}>
              </Card>
            </Sider>
            <Content>
              <Card className={style.cardright}>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default PageLayouts
