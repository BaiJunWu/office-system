import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Merchant extends Component {
  onFinish = (values) => {
    const { dispatch, merchant } = this.props;
    const { record, vendorName, state, pageIndex, pageSize } = merchant;
    if (record) {
      values.vendorId = record.vendorId;
      dispatch({
        type: 'merchant/edit',
        payload: {
          values,
          vendorName,
          state,
          pageIndex,
          pageSize,
        },
      });
    } else {
      dispatch({
        type: 'merchant/add',
        payload: {
          values,
          vendorName,
          state,
          pageIndex,
          pageSize,
        },
      });
    }
  };
  render() {
    const { dispatch, merchant, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      merchant,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <Filter {...modal} />
        <List {...modal} />
        <Modal {...modal} />
      </Page>
    );
  }
}

export default connect(({ merchant, loading }) => ({ merchant, loading }))(
  Merchant,
);
