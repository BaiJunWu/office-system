import React, { Component, Fragment } from 'react';
import config from 'config';
import { Helmet, connect } from 'umi';
import Loader from 'components/Loader';
import PrimaryLayout from './PrimaryLayout';

class ComLayout extends Component {
  previousPath = '';
  render() {
    const { loading, children } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader spinning={loading.effects['app/authorizeList']} />
        {loading.models.app ? '' : <PrimaryLayout>{children}</PrimaryLayout>}
      </Fragment>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(ComLayout);
