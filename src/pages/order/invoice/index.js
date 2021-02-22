import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Invoice extends Component {
  onFinish = (values) => {};
  render() {
    const { dispatch, invoice, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      invoice,
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

export default connect(({ invoice, loading }) => ({ invoice, loading }))(
  Invoice,
);
