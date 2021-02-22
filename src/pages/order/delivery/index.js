import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Delivery extends Component {
  onFinish = (values) => {
    const { dispatch, delivery } = this.props;
    const { record, ...search } = delivery;
    dispatch({
      type: `delivery/orderdelivery`,
      payload: {
        expressCompany: values.expressCompany,
        expressNumber: values.expressNumber,
        orderId: record.orderId,
        search,
      },
    });
  };
  render() {
    const { dispatch, delivery, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      delivery,
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

export default connect(({ delivery, loading }) => ({ delivery, loading }))(
  Delivery,
);
