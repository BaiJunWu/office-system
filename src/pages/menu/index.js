import React, { Component } from 'react';
import { connect } from 'umi';
import { prefix } from 'utils/config';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';
import { arrayToTree, compare } from 'utils/common';

export class Menu extends Component {
  render() {
    const menuList = JSON.parse(sessionStorage.getItem(`${prefix}menuList`));
    const menuTree = arrayToTree(menuList, 'menuId', 'menuParentId').sort(
      compare('menuOrder'),
    );
    const { dispatch, menu } = this.props;
    let modal = {
      menuTree,
      dispatch,
      menu,
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

export default connect(({ menu }) => ({ menu }))(Menu);
