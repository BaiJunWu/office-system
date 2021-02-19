import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import List from './components/List';

class PrarmAccount extends Component {
  onFinish = (values) => {
    const { dispatch, paramauthorize } = this.props;
    const { record } = paramauthorize;
    dispatch({
      type: 'paramauthorize/save',
      payload: {
        appId: record.appId,
        style: 0,
        ...values,
      },
    });
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { dispatch, paramauthorize, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      paramauthorize,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <List {...modal} />
      </Page>
    );
  }
}

export default connect(({ paramauthorize, loading }) => ({
  paramauthorize,
  loading,
}))(PrarmAccount);
