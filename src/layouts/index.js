import React, { Component, Fragment } from 'react'
import { Helmet, connect } from 'umi';
import { Layout, Drawer } from 'antd'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import config from 'config'
import Header from './components/Header'
import Sider from './components/Sider'
import Loader from 'components/Loader'
import style from './index.less'
const { Content } = Layout

class ComLayout extends Component {
  state = {
    isMobile: false
  }
  componentDidMount () {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }
  componentWillUnmount () {
    unenquireScreen(this.enquireHandler)
  }
  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleEditCollapsed',
      payload: {
        collapsed
      },
    })
  }
  render () {
    const { isMobile } = this.state;
    const { app, dispatch, children } = this.props;
    const { collapsed, MenuList } = app;
    const model = {
      app,
      dispatch,
      isMobile,
      onCollapseChange: this.onCollapseChange
    }
    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader spinning={!this.props.loading.models.app} />
        <Layout>
          {
            isMobile ? (
              <Drawer
                maskClosable
                closable={false}
                onClose={() => this.onCollapseChange(!collapsed)}
                visible={!collapsed}
                placement="left"
                width={250}
                style={{
                  padding: 0,
                  height: '100vh',
                }}
              >
                <Sider model={model} />
              </Drawer>
            ) :
              (<Sider model={model} />)
          }
          <div
            className={style.container}
            id="primaryLayout"
          >
            <Header model={model} />
            <Content className={style.content}>
              {children}
            </Content>
          </div>
        </Layout>
      </Fragment>
    )
  }
}
export default connect(({ app, loading }) => ({ app, loading }))(ComLayout);
