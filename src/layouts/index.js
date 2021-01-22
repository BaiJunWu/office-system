import React, { Component, Fragment } from 'react';
import { prefix, siteName } from 'config';
import zhCN from 'antd/lib/locale/zh_CN';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Helmet, connect } from 'umi';
import { ConfigProvider } from 'antd';
import Loader from 'components/Loader';
import PrimaryLayout from './PrimaryLayout';

class ComLayout extends Component {
  previousPath = '';
  render() {
    let token = sessionStorage.getItem(`${prefix}token`);
    if (!token) {
      return false;
    }
    const { loading, children, location } = this.props;
    const currentPath = location.pathname + location.search;
    if (currentPath !== this.previousPath) {
      NProgress.start();
    }
    if (!loading.global) {
      NProgress.done();
      this.previousPath = currentPath;
    }
    return (
      <Fragment>
        <Helmet>
          <title>{siteName}</title>
        </Helmet>
        <Loader spinning={loading.models['app']} />
        {loading.models['app'] ? (
          ''
        ) : (
          <ConfigProvider locale={zhCN}>
            <PrimaryLayout>{children}</PrimaryLayout>
          </ConfigProvider>
        )}
      </Fragment>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(ComLayout);
