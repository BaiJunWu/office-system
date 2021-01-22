import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Menu extends Component {
  onFinish = (values) => {
    const { dispatch, menu } = this.props;
    const { record } = menu;
    if (record) {
      dispatch({
        type: 'menu/edit',
        payload: {
          menuId: record.menuId,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'menu/add',
        payload: {
          ...values,
        },
      });
    }
  };
  render() {
    const { dispatch, menu, loading } = this.props;
    const { menuList } = menu;
    let modal = {
      loading,
      menuList,
      dispatch,
      menu,
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

export default connect(({ menu, loading }) => ({ menu, loading }))(Menu);
