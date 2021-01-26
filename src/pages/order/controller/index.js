import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';

class Controller extends Component {
  onFinish = (values) => {
    const { dispatch, controller } = this.props;
    const {} = merchant;
  };
  render() {
    const { dispatch, controller, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      controller,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <Filter {...modal} />
        <List {...modal} />
      </Page>
    );
  }
}

export default connect(({ controller, loading }) => ({ controller, loading }))(
  Controller,
);
