import React, { Component } from 'react'
import { connect } from 'umi'
import { Card, Layout, Form } from 'antd'
import CardLeft from './components/CardLeft'
import CardRight from './components/CardRight'
import Page from 'components/Page'
const { Sider, Content } = Layout
import style from './index.less'

export class OaPending extends Component {
  state = {
    isCollapsed: false,
  }
  handleCollapsed_Click = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }
  render () {
    const { oapending, dispatch, form } = this.props
    const { list } = oapending
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
                <CardLeft />
              </Card>
            </Sider>
            <Content>
              <Page inner>
                <CardRight list={list.list} />
              </Page>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

OaPending = Form.create()(OaPending);
export default connect(({ oapending }) => ({ oapending }))(OaPending);
