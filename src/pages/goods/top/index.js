import React, { Component } from 'react';
import { connect } from 'umi';
import { message } from 'antd';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class GoodsTop extends Component {
  onFinish = (values) => {};
  render() {
    const { dispatch, top, loading } = this.props;
    let modal = {
      dispatch,
      top,
      loading,
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

export default connect(({ top, loading }) => ({
  top,
  loading,
}))(GoodsTop);
