import React, { Component, Fragment } from 'react';
import config from 'config';
import { prefix } from 'utils/config';
import { Helmet, connect } from 'umi';
import Loader from 'components/Loader';
import PrimaryLayout from './PrimaryLayout';

class ComLayout extends Component {
  render() {
    let token = sessionStorage.getItem(`${prefix}token`);
    if (!token) {
      return false;
    }
    const { loading, children } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader spinning={loading.models['app']} />
        {loading.models['app'] ? '' : <PrimaryLayout>{children}</PrimaryLayout>}
      </Fragment>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(ComLayout);
