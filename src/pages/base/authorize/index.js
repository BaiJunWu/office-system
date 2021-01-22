import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';
import { prefix } from 'config';

class Authorize extends Component {
  onFinish = (values) => {
    const { dispatch, authorize } = this.props;
    const { record } = authorize;
  };
  render() {
    const { dispatch, authorize, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      authorize,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <Modal {...modal} />
        <Filter {...modal} />
        <List {...modal} />
      </Page>
    );
  }
}

export default connect(({ authorize, loading }) => ({ authorize, loading }))(
  Authorize,
);
