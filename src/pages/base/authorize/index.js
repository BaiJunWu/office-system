import React, { Component } from 'react';
import { connect, history } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Authorize extends Component {
  onFinish = (values) => {
    const { dispatch, authorize } = this.props;
    const { record, authorizeName, pageIndex, pageSize } = authorize;
    if (record) {
      values.appIdOpen = record.appIdOpen;
      values.authorizeId = record.authorizeId;
      dispatch({
        type: 'authorize/edit',
        payload: {
          values,
          authorizeName,
          pageIndex,
          pageSize,
        },
      });
    } else {
      dispatch({
        type: 'authorize/add',
        payload: {
          values,
          authorizeName,
          pageIndex,
          pageSize,
        },
      });
    }
  };
  onWechat = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorize/historypath',
      payload: {
        path: '/base/wechataccount/',
        record,
      },
    });
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { dispatch, authorize, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      authorize,
      onFinish: this.onFinish,
      onWechat: this.onWechat,
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

export default connect(({ authorize, loading }) => ({ authorize, loading }))(
  Authorize,
);
