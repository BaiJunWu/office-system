import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class WechatAccount extends Component {
  onFinish = (values) => {
    const { dispatch, wechataccount } = this.props;
    const { record, appId } = wechataccount;
    if (record) {
      let data = [];
      values.brandDtoList.forEach((item) => {
        data.push({ erpBrandId: item });
      });
      values.brandDtoList = data;
      dispatch({
        type: 'wechataccount/edit',
        payload: {
          wechatId: record.wechatId,
          appId: record.appId,
          ...values,
        },
      });
    } else {
      let data = [];
      values.brandDtoList.forEach((item) => {
        data.push({ erpBrandId: item });
      });
      values.brandDtoList = data;
      dispatch({
        type: 'wechataccount/add',
        payload: {
          appId,
          ...values,
        },
      });
    }
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
