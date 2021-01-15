import React, { Component, Fragment } from 'react';
import config from 'config';
import { connect, Redirect } from 'umi';
import { Layout, Drawer } from 'antd';
import { prefix } from 'utils/config';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import Bread from 'components/Layout/Bread';
import Header from 'components/Layout/Header';
import Sider from 'components/Layout/Sider';
import style from './index.less';
const { Content, Footer } = Layout;

class PrimaryLayout extends Component {
  state = {
    isMobile: false,
  };
  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile) => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }
  onCollapseChange = (collapsed) => {
    this.props.dispatch({
      type: 'app/handleEditCollapsed',
      payload: {
        collapsed,
      },
    });
  };
  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const appList = JSON.parse(sessionStorage.getItem(`${prefix}appList`));
    const menuList =
      JSON.parse(sessionStorage.getItem(`${prefix}menuList`)) || [];
    const { isMobile } = this.state;
    const { app, dispatch, children } = this.props;
    const { collapsed } = app;
    const model = {
      app,
      appList,
      menuList,
      dispatch,
      isMobile,
      onCollapseChange: this.onCollapseChange,
    };
    return (
      <Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={() => this.onCollapseChange(!collapsed)}
              visible={!collapsed}
              placement="left"
              width={250}
            >
              <Sider model={model} />
            </Drawer>
          ) : (
            <Sider model={model} />
          )}
          <div className={style.container}>
            <Header model={model} />
            <Content>
              <div className={style.content}>
                <Bread model={model} />
                {children}
                <Redirect to="/menu" />
              </div>
              <Footer className={style.footer}>{config.copyright}</Footer>
            </Content>
          </div>
        </Layout>
      </Fragment>
    );
  }
}
export default connect(({ app, loading }) => ({ app, loading }))(PrimaryLayout);
