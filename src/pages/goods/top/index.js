import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class GoodsTop extends Component {
  render() {
    const { dispatch, top, loading } = this.props;
    let modal = {
      dispatch,
      top,
      loading,
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
