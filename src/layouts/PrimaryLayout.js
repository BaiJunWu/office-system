import React, { Component, Fragment } from 'react';
import config from 'config';
import { connect, Redirect, history } from 'umi';
import { Layout, Drawer } from 'antd';
import { prefix } from 'config';
import { compare, pathMatchRegexp } from 'utils/common';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import Bread from 'components/Layout/Bread';
import Header from 'components/Layout/Header';
import Sider from 'components/Layout/Sider';
import Error from 'pages/404';
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
    const menuList = JSON.parse(
      sessionStorage.getItem(`${prefix}menuList`),
    ).sort(compare('menuOrder'));
    const currentRoute = menuList.find(
      (_) => _.menuUrl && pathMatchRegexp(_.menuUrl, history.location.pathname),
    );
    const { isMobile } = this.state;
    const { app, dispatch, children, loading } = this.props;
    const { collapsed } = app;
    const model = {
      app,
      appList,
      menuList: menuList.filter((item) => item.showMenu === 1), // 过滤掉不显示的菜单
      menuListBread: menuList,
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
                {currentRoute ? (
                  children
                ) : menuList.length > 0 ? (
                  <Redirect to={menuList[0].menuUrl} />
                ) : (
                  <Error />
                )}
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
