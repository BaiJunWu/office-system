import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal.js';

export class Check extends Component {
  onFinish = (values) => {
    const { dispatch, check } = this.props;
    const {
      record,
      productName,
      categoryCode,
      auditState,
      pageIndex,
      pageSize,
    } = check;
    dispatch({
      type: 'check/submit',
      payload: {
        productId: record.productId,
        auditState1: record.auditState == 0 ? 1 : 0,
        productName,
        categoryCode,
        auditState,
        pageIndex,
        pageSize,
      },
    });
  };
  render() {
    const { dispatch, check, app, loading } = this.props;
    let modal = {
      dispatch,
      check,
      app,
      loading,
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

export default connect(({ check, app, loading }) => ({ check, app, loading }))(
  Check,
);
