import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class WechatAccount extends Component {
  onFinish = (values) => {
    console.log(values);
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { dispatch, wechataccount, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      wechataccount,
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

export default connect(({ wechataccount, loading }) => ({
  wechataccount,
  loading,
}))(WechatAccount);
