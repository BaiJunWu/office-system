import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class User extends Component {
  onFinish = (values) => {
    const { dispatch, user } = this.props;
    const { record } = user;
    if (record) {
      dispatch({
        type: 'user/edit',
        payload: {
          userId: record.userId,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'user/add',
        payload: {
          ...values,
        },
      });
    }
  };
  render() {
    const { dispatch, user, loading } = this.props;
    let modal = {
      dispatch,
      user,
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

export default connect(({ user, loading }) => ({ user, loading }))(User);
